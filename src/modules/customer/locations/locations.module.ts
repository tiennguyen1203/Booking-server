import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passportModule } from './../auth/auth.module';
import { CustomerLocationRepository } from './location.repository';
import { CustomerLocationsController } from './locations.controller';
import { CustomerLocationsService } from './locations.service';

@Module({
  controllers: [CustomerLocationsController],
  providers: [CustomerLocationsService],
  imports: [
    passportModule,
    TypeOrmModule.forFeature([CustomerLocationRepository]),
  ],
})
export class CustomerLocationsModule {}
