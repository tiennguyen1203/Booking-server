import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../../../entities';
import { BaseLocationsService } from '../../../modules/base/locations/locations.service';
import { SuperAdminLocationRepository } from './location.repository';

@Injectable()
export class SuperAdminLocationsService extends BaseLocationsService {
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
