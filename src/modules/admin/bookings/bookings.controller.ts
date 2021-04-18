import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate/pagination';
import { QueryParamsPipe } from '../../../pipes/query-params.pipe';
import { AdminJwtBody } from '../auth/interfaces/index';
import { AdminBookingsService } from './bookings.service';

@Controller('admin/bookings')
export class AdminBookingsController {
  constructor(private readonly adminBookingsService: AdminBookingsService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getBookings(
    @AuthAdmin() { location: { id: locationId } }: AdminJwtBody,
    @Query(QueryParamsPipe) queryDto: QueryDto,
  ): Promise<Pagination<Booking>> {
    return this.adminBookingsService.getBookings(locationId, queryDto);
  }
}
