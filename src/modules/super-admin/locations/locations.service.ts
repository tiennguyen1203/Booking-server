import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Location } from '../../../entities';
import { SuperAdminLocationRepository } from './location.repository';

@Injectable()
export class SuperAdminLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    @InjectRepository(SuperAdminLocationRepository)
    private readonly superAdminLocationRepository: SuperAdminLocationRepository,
  ) {
    super(superAdminLocationRepository);
  }

  async createLocation(createLocationDto): Promise<Location> {
    return this.superAdminLocationRepository.createLocation(createLocationDto);
  }
}
