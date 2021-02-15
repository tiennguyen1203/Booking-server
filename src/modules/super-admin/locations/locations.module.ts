import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminLocationRepository } from './location.repository';
import { SuperAdminLocationsController } from './locations.controller';
import { SuperAdminLocationsService } from './locations.service';

@Module({
  controllers: [SuperAdminLocationsController],
  providers: [SuperAdminLocationsService],
  imports: [TypeOrmModule.forFeature([SuperAdminLocationRepository])],
})
export class LocationsModule {}
