import { EntityRepository, Repository } from 'typeorm';
import { QueryDto } from './../base-dto/base.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async getLocations(queryDto: QueryDto): Promise<[Location[], number]> {
    console.log('adfadgsdfg', queryDto);
    const { take, skip } = queryDto;
    return this.findAndCount({ take, skip });
  }

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const newLocation: Location = new Location(createLocationDto);

    await newLocation.save();

    return newLocation;
  }
}
