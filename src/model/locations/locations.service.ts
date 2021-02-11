import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../paginate';
import { QueryDto } from './../base-dto/base.dto';
import { Location } from './location.entity';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
  ) {}

  async getLocations(queryDto: QueryDto): Promise<Pagination<Location>> {
    const [results, total] = await this.locationRepository.getLocations(
      queryDto,
    );
    return new Pagination<Location>({
      results,
      total,
    });
  }

  async createLocation(createLocationDto): Promise<Location> {
    return this.locationRepository.createLocation(createLocationDto);
  }
}
