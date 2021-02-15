import { EntityRepository } from 'typeorm';
import { CreateLocationDto } from '../../../dto';
import { Location } from '../../../entities/location.entity';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';

@EntityRepository(Location)
export class SuperAdminLocationRepository extends BaseLocationRepository {
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const newLocation: Location = new Location(createLocationDto);
    await newLocation.save();

    return newLocation;
  }
}
