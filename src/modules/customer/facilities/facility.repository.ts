import { EntityRepository } from 'typeorm';
import { Facility } from './../../../entities/facility.entity';
import { BaseFacilityRepository } from './../../base/facilities/facility.repository';

@EntityRepository(Facility)
export class CustomerFacilityRepository extends BaseFacilityRepository {}
