import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseLocationsService } from '../../base/locations/locations.service';
import { AdminLocationRepository } from './location.repository';

@Injectable()
export class AdminLocationsService extends BaseLocationsService {
  constructor(
    @InjectRepository(AdminLocationRepository)
    private readonly adminLocationRepository: AdminLocationRepository,
  ) {
    super(adminLocationRepository);
  }
}
