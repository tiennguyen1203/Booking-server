import { EntityRepository, Repository } from 'typeorm';
import { LocationType } from '../../../entities/location-type.entity';

@EntityRepository(LocationType)
export class AdminLocationTypeRepository extends Repository<LocationType> {}
