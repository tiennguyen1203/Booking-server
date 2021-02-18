import { EntityRepository } from 'typeorm';
import { CreateLocationDto } from '../../../dto';
import { Location } from '../../../entities';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';

@EntityRepository(Location)
export class SuperAdminLocationRepository extends BaseLocationRepository {
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    console.log('asdasd', createLocationDto);
    const newLocation: Location = new Location(createLocationDto);
    await newLocation.save();

    return newLocation;
  }
}
