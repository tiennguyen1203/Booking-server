import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string) {
    return this.cache.get<T>(key);
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }
}
