import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Location } from '../../../entities';
import { BaseRoomRepository } from '../../../modules/base/rooms/room.repository';
import { BookingHistoryRepository } from '../../base/locations/booking-history.repository';
import { GetLocationBookingsDto, BookingDto } from './dto/booking.dto';
import { CustomerLocationRepository } from './location.repository';
import { Room } from '../../../entities/room.entity';
import { BookingHistory } from '../../../entities/booking-history.entity';

@Injectable()
export class CustomerLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    private readonly customerLocationRepository: CustomerLocationRepository,
    private readonly bookingHistoryRepository: BookingHistoryRepository,
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
    const rooms: Room[] = await this.bookingHistoryRepository.query(
      `
        SELECT * FROM room
        WHERE "locationId" = '${locationId}'
        AND id NOT IN (
          SELECT "roomId" FROM booking_history
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

    console.log(rooms);
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
  }): Promise<BookingHistory> {
    const existRoom = await this.baseRoomRepository.findOne({
      where: { locationId, id: roomId },
    });
    if (!existRoom) {
      throw new NotFoundException('Room not found');
    }

    const bookingHistory: BookingHistory[] = await this.bookingHistoryRepository.query(
      `
        SELECT * FROM "booking_history"
        WHERE "roomId" = '${roomId}'
        AND (
          ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}')
          OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
          OR ("startTime" <= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" >= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
          OR ("startTime" >= TIMESTAMP WITH TIME ZONE '${inputStartTime}' AND "endTime" <= TIMESTAMP WITH TIME ZONE '${inputEndTime}')
        )
      `,
    );
    if (bookingHistory?.length) {
      throw new BadRequestException('Room is not available');
    }
    const newBookingHistory = this.bookingHistoryRepository.create();
    newBookingHistory.roomId = roomId;
    newBookingHistory.locationId = locationId;
    newBookingHistory.startTime = inputStartTime;
    newBookingHistory.endTime = inputEndTime;
    newBookingHistory.userId = userId;
    await newBookingHistory.save();

    return newBookingHistory;
  }
}
