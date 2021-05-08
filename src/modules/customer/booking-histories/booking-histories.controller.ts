import { BookingHistoriesService } from './booking-histories.service';
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
  import { UpdateBookingDto } from '../../../dto/booking/update-booking.dto';
import { AuthCustomer } from '../../../decorators/auth-customer.decorator';
// import { CustomerJwtBody } from '../../../modules/customer/auth/interfaces';
import { BookingHistory } from '../../../entities';
import { JwtBody } from '../auth/interfaces';

@Controller('customer/booking-histories')
export class BookingHistoriesController {
    constructor(private readonly customerBookingHistoriesService: BookingHistoriesService) {}

    @Get()
  @UseGuards(AuthGuard('jwt'))
  getBookings(
    @AuthCustomer() { id: ownerId }: JwtBody,
    @Query(QueryParamsPipe) queryDto: QueryDto,
  ): Promise<Pagination<Booking>> {
    try {
      return this.customerBookingHistoriesService.getBookings(ownerId, queryDto);
    } catch (error) {
      return error;
    }
  }
}
