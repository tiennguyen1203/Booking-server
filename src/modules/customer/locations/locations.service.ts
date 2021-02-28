import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../../../entities';
import { BaseLocationsService } from '../../../modules/base/locations/locations.service';
import { CustomerLocationRepository } from './locations.repository';

@Injectable()
export class CustomerLocationsService extends BaseLocationsService {
  constructor(
    @InjectRepository(CustomerLocationRepository)
    private readonly customerLocationRepository: CustomerLocationRepository,
  ) {
    super(customerLocationRepository);
  }

  async getAllLocations(): Promise<Location[]> {
    return this.customerLocationRepository.getAllLocations();
  }
}
