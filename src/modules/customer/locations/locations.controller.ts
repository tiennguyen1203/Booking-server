import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Location } from './../../../entities/location.entity';
import { GetLocationBookingsDto, BookingDto } from './dto/booking.dto';
import { CustomerLocationsService } from './locations.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthCustomer } from '../../../decorators/auth-customer.decorator';
import { JwtBody } from '../auth/auth.service';

interface CustomCustomerLocationsController {
  booking?: any;
  getLocationBookings: any;
}

@Crud({
  model: {
    type: Location,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
    join: {
      locationType: {
        allow: ['name', 'description'],
      },
      rooms: {},
      city: {
        allow: [
          'name',
          'description',
          'thumbnail',
          'totalLocations',
          'averagePrice',
        ],
      },
      serviceTypes: {},
    },
  },
  params: {
    id: { type: 'uuid', primary: true, field: 'id' },
  },
})
@Controller('customer/locations')
export class CustomerLocationsController
  implements CrudController<Location>, CustomCustomerLocationsController {
  constructor(public service: CustomerLocationsService) {}

  @Post(':id/book')
  @UseGuards(AuthGuard('jwt'))
  booking(
    @AuthCustomer() user: JwtBody,
    @Param('id') locationId: string,
    @Body() bookingDto: BookingDto,
  ) {
    return this.service.booking({
      locationId,
      bookingDto,
      userId: user.id,
      userEmail: user.email,
    });
  }

  @Get(':id/bookings')
  getLocationBookings(
    @Query() getLocationBookingsDto: GetLocationBookingsDto,
    @Param('id') locationId: string,
  ) {
    return this.service.getLocationBookings(locationId, getLocationBookingsDto);
  }
}
