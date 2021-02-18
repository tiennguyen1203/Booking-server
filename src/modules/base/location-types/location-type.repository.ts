import { EntityRepository, Repository } from 'typeorm';
import { LocationType } from '../../../entities';

@EntityRepository(LocationType)
export class BaseLocationTypeRepository extends Repository<LocationType> {}
