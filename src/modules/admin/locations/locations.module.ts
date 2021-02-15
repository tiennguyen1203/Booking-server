import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminLocationsController } from './locations.controller';
import { AdminLocationsService } from './locations.service';
import { AdminLocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminLocationRepository])],
  controllers: [AdminLocationsController],
  providers: [AdminLocationsService],
})
export class AdminLocationsModule {}
