import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Location } from '../../../entities';
import { BaseRoomRepository } from '../../../modules/base/rooms/room.repository';
import { BookingRepository } from '../../base/locations/booking.repository';
import { GetLocationBookingsDto, BookingDto } from './dto/booking.dto';
import { CustomerLocationRepository } from './location.repository';
import { Room } from '../../../entities/room.entity';
import { Booking } from '../../../entities/booking.entity';

@Injectable()
export class CustomerLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    private readonly customerLocationRepository: CustomerLocationRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly baseRoomRepository: BaseRoomRepository,
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
    // this.baseRoomRepository.createQueryBuilder('room').leftJoinAndSelect('')
    // this.baseRoomRepository.
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
    bookingDto: { roomId, startTime: inputStartTime, endTime: inputEndTime },
    userId,
  }: {
    locationId: string;
    bookingDto: BookingDto;
    userId: string;
  }): Promise<Booking> {
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
    const newBooking = this.bookingRepository.create();
    newBooking.roomId = roomId;
    newBooking.locationId = locationId;
    newBooking.startTime = inputStartTime;
    newBooking.endTime = inputEndTime;
    newBooking.userId = userId;
    await newBooking.save();

    return newBooking;
  }
}
