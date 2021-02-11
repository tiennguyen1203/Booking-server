import { Controller, Get } from '@nestjs/common';
import { LocationType } from './location-type.entity';
import { LocationTypesService } from './location-types.service';

@Controller('location-types')
export class LocationTypesController {
  constructor(
    private locationTypesService: LocationTypesService
  ) { }

  @Get()
  getLocationTypes(): Promise<LocationType[]> {
    return this.locationTypesService.getLocationTypes();
  }
}
