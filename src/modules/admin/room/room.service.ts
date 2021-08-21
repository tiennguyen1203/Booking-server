import { Booking } from './../../../entities/booking.entity';
import { Pagination } from './../../../paginate/pagination';
import { QueryDto } from './../../../dto/query-params.dto';
import { Injectable } from '@nestjs/common';
import { BaseRoomsService } from '../../base/rooms/room.service';
import { RoomRepository } from './room.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseBookingRepository } from '../../base/booking/booking.repository';

@Injectable()
export class RoomService extends BaseRoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    private readonly bookingRepository: BaseBookingRepository,
  ) {
    super(roomRepository);
  }

  async getBookings(
    roomId: string,
    queryDto: QueryDto,
  ): Promise<Pagination<Booking>> {
    const [results, total] = await this.bookingRepository.findAndCount({
      where: { roomId },
      take: queryDto.take,
      skip: queryDto.skip,
      loadEagerRelations: false,
      relations: ['user'],
    });

    return new Pagination<Booking>({
      results,
      total,
    });
  }
}
