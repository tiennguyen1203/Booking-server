import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'src/paginate';
import { QueryParamsPipe } from '../pipes/query-params.pipe';
import { QueryDto } from './../base-dto/base.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  getLocations(
    @Query(QueryParamsPipe) queryDto: QueryDto,
  ): Promise<Pagination<Location>> {
    return this.locationsService.getLocations(queryDto);
  }

  @Post()
  createLocation(
    @Body(ValidationPipe) createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.createLocation(createLocationDto);
  }
}
