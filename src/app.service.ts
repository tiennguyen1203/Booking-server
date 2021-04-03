import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseLocationTypeRepository } from './modules/base/location-types/location-type.repository';
import { BaseLocationRepository } from './modules/base/locations/location.repository';
import { BaseCityRepository } from './modules/base/cities/city.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BaseLocationTypeRepository)
    private readonly baseLocationTypeRepository: BaseLocationTypeRepository,

    @InjectRepository(BaseCityRepository)
    private readonly baseCityRepository: BaseCityRepository,
  ) {}
  getHello(): string {
    return 'Move to /docs to get APIs son of bitch!';
  }

  async getAppConfig(): Promise<any> {
    const [locationTypes, cities] = await Promise.all([
      this.baseLocationTypeRepository.find(),
      this.baseCityRepository.find(),
    ]);
    return {
      locationTypes,
      cities,
    };
  }
}
