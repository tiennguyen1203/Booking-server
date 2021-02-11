import { Injectable } from '@nestjs/common';
import { LocationType } from './location-type.entity';
import { LocationTypeRepository } from './location-type.repository';

@Injectable()
export class LocationTypesService {
  constructor(
    private readonly locationTypeRepository: LocationTypeRepository
  ) { }

  getLocationTypes(): Promise<LocationType[]> {
    return this.locationTypeRepository.find();
  }
}
