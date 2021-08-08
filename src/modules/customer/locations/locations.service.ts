import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PAYMENT_STATUS } from '../../../constant';
import { Location } from '../../../entities';
import { Booking } from '../../../entities/booking.entity';
import { Room } from '../../../entities/room.entity';
import { sendEmailNotifyBookingSuccessfulForSender } from '../../../lib/email-service';
import { sendEmailNotifyBookingSuccessfulForOwner } from '../../../lib/email-service/email-notify-booking-successful-for-owner';
import {
  capturePaypalOrder,
  createPaypalOrder,
  getPaypalOrder,
} from '../../../lib/payment-gateway/paypal';
import { BaseRoomRepository } from '../../../modules/base/rooms/room.repository';
import { BaseBookingHistoryRepository } from '../../base/booking-histories/booking-history.repository';
import { BookingRepository } from '../../base/locations/booking.repository';
import { BaseUserRepository } from '../../base/user/user.repository';
import { BookingDto, GetLocationBookingsDto } from './dto/booking.dto';
import { CustomerLocationRepository } from './location.repository';

@Injectable()
export class CustomerLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    private readonly customerLocationRepository: CustomerLocationRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly baseRoomRepository: BaseRoomRepository,
    private readonly baseUserRepository: BaseUserRepository,
    private readonly baseBookingHistoryRepository: BaseBookingHistoryRepository,
  ) {
    super(customerLocationRepository);
  }

  async getLocationBookings(
    locationId: string,
    {
      startTime: inputStartTime,
      endTime: inputEndTime,
    }: GetLocationBookingsDto,
  ) {
    const rooms: Room[] = await this.bookingRepository.query(
      `
        SELECT * FROM room
        WHERE "locationId" = '${locationId}'
        AND id NOT IN (
          SELECT "roomId" FROM booking
          WHERE "locationId" = '${locationId}'
          AND (
            ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}')
            OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
            OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
            OR ("startTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
          )
        )
      `,
    );

    return rooms;
  }

  async booking({
    locationId,
    bookingDto: {
      roomId,
      startTime: inputStartTime,
      endTime: inputEndTime,
      returnUrl,
      cancelUrl,
    },
    userId,
    userEmail,
  }: {
    locationId: string;
    bookingDto: BookingDto;
    userId: string;
    userEmail: string;
  }) {
    const location = await this.customerLocationRepository.findOne(locationId);
    if (!location?.userId) {
      throw new BadRequestException('This location has no owner');
    }
    const owner = await this.baseUserRepository.findOne(location.userId);
    if (!owner) {
      throw new BadRequestException('This location has no owner');
    }
    // if (!location.paypalMerchantId) {
    //   throw new BadRequestException('This location is not signed up merchant');
    // }

    const existRoom = await this.baseRoomRepository.findOne({
      where: { locationId, id: roomId },
    });
    if (!existRoom) {
      throw new NotFoundException('Room not found');
    }

    const bookings: Booking[] = await this.bookingRepository.query(
      `
        SELECT * FROM "booking"
        WHERE "roomId" = '${roomId}'
        AND (
          ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}')
          OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
          OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
          OR ("startTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
        )
      `,
    );
    if (bookings?.length) {
      throw new BadRequestException('Room is not available');
    }

    const USDtoVND = 23000;
    const paypalOrder = await createPaypalOrder({
      amountValue: +existRoom.price / USDtoVND,
      returnUrl,
      cancelUrl,
    });

    const newBooking = this.bookingRepository.create();
    newBooking.roomId = roomId;
    newBooking.locationId = locationId;
    newBooking.startTime = inputStartTime;
    newBooking.endTime = inputEndTime;
    newBooking.userId = userId;
    newBooking.orderId = paypalOrder.id;
    await newBooking.save();

    try {
      await Promise.all([
        sendEmailNotifyBookingSuccessfulForSender({
          receiverEmail: userEmail,
        }),
        sendEmailNotifyBookingSuccessfulForOwner({
          receiverEmail: owner.email,
        }),
      ]);
    } catch (error) {
      console.error(`sendEmail fails `, error);
    }
    await this.baseBookingHistoryRepository.save({
      previousStatus: null,
      bookingId: newBooking.id,
      currentStatus: newBooking.status,
      locationId,
      roomId,
    });
    return {
      ...newBooking,
      link: paypalOrder.link,
    };
  }

  async capturePayment(userId, bookingId) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, userId },
    });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (!booking.orderId) {
      throw new BadRequestException('Cannot capture payment');
    }
    const order = await getPaypalOrder(booking.orderId);
    if (order.status === PAYMENT_STATUS.CREATED) {
      throw new BadRequestException(
        `This checkout order isn't approved by buyer yet`,
      );
    }

    if (order.status === PAYMENT_STATUS.COMPLETED) {
      throw new BadRequestException('This checkout order is processed');
    }
    await capturePaypalOrder(order.id);

    booking.paymentStatus = order.status;
    await this.bookingRepository.save(booking);
    return booking;
  }
}
