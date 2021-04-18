import { Injectable } from '@nestjs/common';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate';
import { AdminBookingRepository } from './booking.repository';

@Injectable()
export class AdminBookingsService {
  constructor(
    private readonly adminBookingRepository: AdminBookingRepository,
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
}
