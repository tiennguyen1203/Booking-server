import { EntityRepository } from 'typeorm';
import { Location } from './../../../entities/location.entity';
import { BaseLocationRepository } from './../../base/locations/location.repository';

@EntityRepository(Location)
export class CustomerLocationRepository extends BaseLocationRepository {}
