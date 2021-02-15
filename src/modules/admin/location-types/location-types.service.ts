import { Injectable } from '@nestjs/common';
import { LocationType } from '../../../entities/location-type.entity';
import { AdminLocationTypeRepository } from './location-type.repository';

@Injectable()
export class AdminLocationTypesService {
  constructor(
    private readonly adminLocationTypeRepository: AdminLocationTypeRepository,
  ) {}

  getLocationTypes(): Promise<LocationType[]> {
    return this.adminLocationTypeRepository.find();
  }
}
