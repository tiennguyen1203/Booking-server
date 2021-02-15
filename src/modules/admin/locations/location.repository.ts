import { EntityRepository } from 'typeorm';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';
import { Location } from '../../../entities/location.entity';

@EntityRepository(Location)
export class AdminLocationRepository extends BaseLocationRepository {}
