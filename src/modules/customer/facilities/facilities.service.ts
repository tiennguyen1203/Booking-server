import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Facility } from '../../../entities';
import { CustomerFacilityRepository } from './facility.repository';

@Injectable()
export class FacilitiesService extends TypeOrmCrudService<Facility> {
  constructor(
    @InjectRepository(CustomerFacilityRepository)
    private readonly customerFacilityRepository: CustomerFacilityRepository,
  ) {
    super(customerFacilityRepository);
  }
}
