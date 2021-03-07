import { EntityRepository, Repository } from 'typeorm';
import { Facility } from './../../../entities/facility.entity';

@EntityRepository(Facility)
export class BaseFacilityRepository extends Repository<Facility> {}
