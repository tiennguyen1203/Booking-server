import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passportModule } from './../auth/auth.module';
import { CustomerLocationRepository } from './location.repository';
import { CustomerLocationsController } from './locations.controller';
import { CustomerLocationsService } from './locations.service';
import { BookingRepository } from '../../base/locations/booking.repository';
import { BaseRoomRepository } from '../../base/rooms/room.repository';

@Module({
  controllers: [CustomerLocationsController],
  providers: [CustomerLocationsService],
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      CustomerLocationRepository,
      BookingRepository,
      BaseRoomRepository,
    ]),
  ],
})
export class CustomerLocationsModule {}
