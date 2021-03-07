import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from '../../../dto';
import { Location } from '../../../entities/location.entity';
import { Pagination } from '../../../paginate';
import { BaseLocationRepository } from './location.repository';

@Injectable()
export class BaseLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    @InjectRepository(Location)
    private readonly baseLocationRepository: BaseLocationRepository,
  ) {
    super(baseLocationRepository);
  }

  async getLocations(queryDto: QueryDto): Promise<Pagination<Location>> {
    const [results, total] = await this.baseLocationRepository.getLocations(
      queryDto,
    );

    return new Pagination<Location>({
      results,
      total,
    });
  }
}
