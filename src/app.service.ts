import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseLocationTypeRepository } from './modules/base/location-types/location-type.repository';
import { BaseLocationRepository } from './modules/base/locations/location.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BaseLocationTypeRepository)
    private readonly baseLocationTypeRepository: BaseLocationTypeRepository,
  ) {}
  getHello(): string {
    return 'Move to /docs to get APIs son of bitch!';
  }

  async getAppConfig(): Promise<any> {
    const locationTypes = await this.baseLocationTypeRepository.find();
    return {
      locationTypes,
    };
  }
}
