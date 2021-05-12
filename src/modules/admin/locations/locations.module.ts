import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminLocationsController } from './locations.controller';
import { AdminLocationsService } from './locations.service';
import { AdminLocationRepository } from './location.repository';
import { passportModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminLocationRepository]),
    passportModule,
  ],
  controllers: [AdminLocationsController],
  providers: [AdminLocationsService],
})
export class AdminLocationsModule {}
