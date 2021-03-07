import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Location } from 'src/entities';
import { CustomerLocationRepository } from './location.repository';

@Injectable()
export class CustomerLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    private readonly customerLocationRepository: CustomerLocationRepository,
  ) {
    super(customerLocationRepository);
  }
}
