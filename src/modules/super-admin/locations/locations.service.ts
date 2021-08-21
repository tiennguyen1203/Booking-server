import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Location } from '../../../entities';
import { RedisCacheService } from './../../redis-cache/redis-cache.service';
import { SuperAdminLocationRepository } from './location.repository';

@Injectable()
export class SuperAdminLocationsService extends TypeOrmCrudService<Location> {
  constructor(
    @InjectRepository(SuperAdminLocationRepository)
    private readonly superAdminLocationRepository: SuperAdminLocationRepository,
    private readonly redis: RedisCacheService,
  ) {
    super(superAdminLocationRepository);
  }

  async createLocation(createLocationDto): Promise<Location> {
    return this.superAdminLocationRepository.createLocation(createLocationDto);
  }

  async getMany(request) {
    const result = await super.getMany(request);
    const data = await Promise.all(
      (result as any).data.map(async (location) => ({
        ...location,
        count:
          (await this.redis.get(`locations:${location.id}:views_count`)) || 0,
      })),
    );
    return {
      ...result,
      data,
    } as any;
  }
}
