import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLocationDto } from '../../../dto';
import { Location } from '../../../entities';
import { SuperAdminLocationsService } from './locations.service';

@Controller('super-admin/locations')
export class SuperAdminLocationsController {
  constructor(private superAdminLocationsService: SuperAdminLocationsService) {}

  @Post()
  @ApiCreatedResponse({ type: Location })
  createLocation(
    @Body(ValidationPipe) createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.superAdminLocationsService.createLocation(createLocationDto);
  }
}
