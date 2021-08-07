import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate';
import { AdminBookingRepository } from './booking.repository';
import { UpdateBookingDto } from '../../../dto/booking/update-booking.dto';
import { BookingStatus } from '../../../constant';
import { sendEmailNotifyBookingIsAccepted } from '../../../utils/email-service/email-notify-booking-is-accepted';
import { BaseUserRepository } from '../../base/user/user.repository';
import { sendEmailNotifyBookingIsRejected } from '../../../utils/email-service/email-notify-booking-is-rejected';
import { BaseBookingHistoryRepository } from '../../base/booking-histories/booking-history.repository';

@Injectable()
export class AdminBookingsService {
  constructor(
    private readonly adminBookingRepository: AdminBookingRepository,
    private readonly baseUserRepository: BaseUserRepository,
    private readonly baseBookingHistoryRepository: BaseBookingHistoryRepository,
  ) {}

  async getBookings(
    locationId: string,
    { take, skip }: QueryDto,
  ): Promise<Pagination<Booking>> {
    const [results, total] = await this.adminBookingRepository.findAndCount({
      where: {
        locationId,
      },
      take,
      skip,
    });
    return new Pagination<Booking>({ results, total });
  }

  async updateBooking({
    locationId,
    updateBookingDto: { status },
    bookingId,
    ownerId,
  }: {
    locationId: string;
    updateBookingDto: UpdateBookingDto;
    bookingId: string;
    ownerId: string;
  }) {
    const existBooking = await this.adminBookingRepository.findOne(bookingId, {
      where: { locationId },
    });
    if (!existBooking) {
      throw new NotFoundException('Booking not found');
    }

    const result = await this.adminBookingRepository.save({
      id: bookingId,
      status,
    });

    await this.baseBookingHistoryRepository.save({
      accepterId: ownerId,
      bookingId,
      previousStatus: existBooking.status,
      currentStatus: status,
      roomId: existBooking.roomId,
      locationId,
    });

    const sender = await this.baseUserRepository.findOne(result.userId);
    if (status === BookingStatus.ACCEPTED) {
      try {
        await sendEmailNotifyBookingIsAccepted({ receiverEmail: sender.email });
      } catch (error) {
        console.error('sendEmailNotifyBookingIsAccepted fails', error);
      }
    }

    if (status === BookingStatus.REJECTED) {
      try {
        await sendEmailNotifyBookingIsRejected({ receiverEmail: sender.email });
      } catch (error) {
        console.error('sendEmailNotifyBookingIsRejected fails', error);
      }
    }

    return result;
  }
}
