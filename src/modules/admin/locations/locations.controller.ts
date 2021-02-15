import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { QueryDto } from '../../../dto';
import { Pagination } from '../../../paginate';
import { getLocationsResponse } from '../../../swagger';
import { Location } from '../../../entities/location.entity';
import { QueryParamsPipe } from '../../../pipes';
import { AdminLocationsService } from './locations.service';

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
}
