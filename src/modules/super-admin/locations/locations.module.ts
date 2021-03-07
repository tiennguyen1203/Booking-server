import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passportModule } from './../../customer/auth/auth.module';
import { SuperAdminLocationRepository } from './location.repository';
import { SuperAdminLocationsController } from './locations.controller';
import { SuperAdminLocationsService } from './locations.service';

@Module({
  controllers: [SuperAdminLocationsController],
  providers: [SuperAdminLocationsService],
  imports: [
    passportModule,
    TypeOrmModule.forFeature([SuperAdminLocationRepository]),
  ],
})
export class LocationsModule {}
