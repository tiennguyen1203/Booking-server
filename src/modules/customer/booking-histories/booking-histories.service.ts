import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate';
import { BaseBookingRepository } from '../../base/booking/booking.repository';

const PREFIX_NEGATIVE = '-';
@Injectable()
export class BookingHistoriesService {
  constructor(private readonly baseBookingRepository: BaseBookingRepository) {}

  async getBookings(
    userId: string,
    { take, skip, order }: QueryDto,
  ): Promise<Pagination<Booking>> {
    const findManyOptions: FindManyOptions<Booking> = {
      where: {
        userId,
      },
      take,
      skip,
      order: {},
    };
    if (order) {
      const removedPrefixNegativeOrder = order.startsWith(PREFIX_NEGATIVE)
        ? order.split(PREFIX_NEGATIVE)[1]
        : order;
      if (['createdAt'].includes(removedPrefixNegativeOrder))
        findManyOptions.order[removedPrefixNegativeOrder] = order.startsWith(
          PREFIX_NEGATIVE,
        )
          ? 'DESC'
          : 'ASC';
    }

    const [results, total] = await this.baseBookingRepository.findAndCount(
      findManyOptions,
    );
    return new Pagination<Booking>({ results, total });
  }
}
