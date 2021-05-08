import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingHistory } from 'src/entities';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate';
import { BaseBookingRepository } from '../../base/booking/booking.repository';

@Injectable()
export class BookingHistoriesService {
    constructor(
        private readonly baseBookingRepository: BaseBookingRepository,
      ) {}
    
      async getBookings(
        userId: string,
        { take, skip }: QueryDto,
      ): Promise<Pagination<Booking>> {
        const [results, total] = await this.baseBookingRepository.findAndCount({
          where: {
            userId,
          },
          take,
          skip,
        });
        return new Pagination<Booking>({ results, total });
      }
}
