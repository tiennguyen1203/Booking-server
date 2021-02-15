import { EntityRepository, Repository } from 'typeorm';
import { QueryDto } from '../../../dto';
import { Location } from '../../../entities/location.entity';

@EntityRepository(Location)
export class BaseLocationRepository extends Repository<Location> {
  async getLocations(queryDto: QueryDto): Promise<[Location[], number]> {
    const { take, skip } = queryDto;
    return this.findAndCount({ take, skip });
  }
}
