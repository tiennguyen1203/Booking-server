import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { QueryDto } from '../../../dto/query-params.dto';
import { Booking } from '../../../entities/booking.entity';
import { Pagination } from '../../../paginate/pagination';
import { QueryParamsPipe } from '../../../pipes/query-params.pipe';
import { AdminJwtBody } from '../auth/interfaces/index';
import { AdminBookingsService } from './bookings.service';
import { UpdateBookingDto } from '../../../dto/booking/update-booking.dto';

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

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateBooking(
    @AuthAdmin() { id: ownerId, location: { id: locationId } }: AdminJwtBody,
    @Body(QueryParamsPipe) updateBookingDto: UpdateBookingDto,
    @Param('id') bookingId: string,
  ): Promise<Booking> {
    return this.adminBookingsService.updateBooking({
      locationId,
      updateBookingDto,
      bookingId,
      ownerId,
    });
  }
}
