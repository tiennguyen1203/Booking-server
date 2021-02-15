import { Controller, Get } from '@nestjs/common';
import { LocationType } from '../../../entities/location-type.entity';
import { AdminLocationTypesService } from './location-types.service';

@Controller('admin/location-types')
export class AdminLocationTypesController {
  constructor(private adminLocationTypesService: AdminLocationTypesService) {}

  @Get()
  getLocationTypes(): Promise<LocationType[]> {
    return this.adminLocationTypesService.getLocationTypes();
  }
}
