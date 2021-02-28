import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerLocationRepository } from './locations.repository';
import { CustomerLocationController } from './locations.controller';
import { CustomerLocationsService } from './locations.service';

@Module({
  controllers: [CustomerLocationController],
  providers: [CustomerLocationsService],
  imports: [TypeOrmModule.forFeature([CustomerLocationRepository])],
})
export class CustomerLocationsModule {}
