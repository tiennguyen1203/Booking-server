import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseBookingHistoryRepository } from '../../base/booking-histories/booking-history.repository';
import { BookingRepository } from '../../base/locations/booking.repository';
import { BaseRoomRepository } from '../../base/rooms/room.repository';
import { BaseUserRepository } from '../../base/user/user.repository';
import { RedisCacheModule } from './../../redis-cache/redis-cache.module';
import { passportModule } from './../auth/auth.module';
import { CustomerLocationRepository } from './location.repository';
import { CustomerLocationsController } from './locations.controller';
import { CustomerLocationsService } from './locations.service';

@Module({
  controllers: [CustomerLocationsController],
  providers: [CustomerLocationsService],
  imports: [
    passportModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([
      CustomerLocationRepository,
      BookingRepository,
      BaseRoomRepository,
      BaseUserRepository,
      BaseBookingHistoryRepository,
    ]),
  ],
})
export class CustomerLocationsModule {}
