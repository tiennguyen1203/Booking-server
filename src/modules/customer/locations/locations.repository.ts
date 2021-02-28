import { EntityRepository, Logger } from 'typeorm';
import { CreateLocationDto } from '../../../dto';
import { Location } from '../../../entities';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';

@EntityRepository(Location)
export class CustomerLocationRepository extends BaseLocationRepository {

    async getAllLocations(): Promise<Location[]> {
        const query = this.createQueryBuilder('location');
        const locations = await query.getMany();
        return locations;
    }
}
