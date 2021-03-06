import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseLocationsService } from '../../base/locations/locations.service';
import { AdminLocationRepository } from './location.repository';
import { UpdateLocationDto } from '../../../dto/location/update-location.dto';

@Injectable()
export class AdminLocationsService extends BaseLocationsService {
  constructor(
    @InjectRepository(AdminLocationRepository)
    private readonly adminLocationRepository: AdminLocationRepository,
  ) {
    super(adminLocationRepository);
  }

  async updateLocation({
    locationId,
    updateLocationDto,
  }: {
    locationId: string;
    updateLocationDto: UpdateLocationDto;
  }) {
    await this.adminLocationRepository.update(locationId, updateLocationDto);
    return this.adminLocationRepository.findOne(locationId);
  }
}
