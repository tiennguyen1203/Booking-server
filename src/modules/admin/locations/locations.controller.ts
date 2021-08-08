import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { QueryDto } from '../../../dto';
import {
  SignUpMerchantCallbackDto,
  SignUpMerchantDto,
} from '../../../dto/location/sign-up-merchant.dto';
import { UpdateLocationDto } from '../../../dto/location/update-location.dto';
import { Location } from '../../../entities/location.entity';
import { Pagination } from '../../../paginate';
import { QueryParamsPipe } from '../../../pipes';
import { getLocationsResponse } from '../../../swagger';
import { AdminJwtBody } from '../auth/interfaces';
import { AdminLocationsService } from './locations.service';

@UseGuards(AuthGuard())
@Controller('admin/locations')
export class AdminLocationsController {
  constructor(private adminLocationsService: AdminLocationsService) {}

  @Get()
  @ApiCreatedResponse({ type: getLocationsResponse })
  getLocations(
    @Query(QueryParamsPipe) queryDto: QueryDto,
  ): Promise<Pagination<Location>> {
    return this.adminLocationsService.getLocations(queryDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateLocation(
    @AuthAdmin() { location: { id: ownLocationId } }: AdminJwtBody,
    @Body() updateLocationDto: UpdateLocationDto,
    @Param('id') locationId: string,
  ): Promise<Location> {
    if (locationId !== ownLocationId) {
      throw new ForbiddenException('Permission denied');
    }

    return this.adminLocationsService.updateLocation({
      locationId,
      updateLocationDto,
    });
  }

  @Post('/:id/sign-up-merchant')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  signUpMerchant(
    @AuthAdmin() { location: { id: ownLocationId } }: AdminJwtBody,
    @Param('id') locationId: string,
    @Body() signUpMerchantDto: SignUpMerchantDto,
  ) {
    if (locationId !== ownLocationId) {
      throw new ForbiddenException('Permission denied');
    }

    return this.adminLocationsService.signUpMerchant(
      locationId,
      signUpMerchantDto,
    );
  }

  @Post('/:id/sign-up-merchant/callback')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  signUpMerchantCallback(
    @AuthAdmin() { location: { id: ownLocationId } }: AdminJwtBody,
    @Param('id') locationId: string,
    @Body() { paypalMerchantId }: SignUpMerchantCallbackDto,
  ) {
    if (locationId !== ownLocationId) {
      throw new ForbiddenException('Permission denied');
    }

    return this.adminLocationsService.signUpMerchantCallback(
      locationId,
      paypalMerchantId,
    );
  }
}
