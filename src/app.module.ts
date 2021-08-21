import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { S3Adapter } from './lib/aws/s3';
import { AdminAuthModule } from './modules/admin/auth/auth.module';
import { AdminBookingsModule } from './modules/admin/bookings/bookings.module';
import { AdminLocationTypesModule } from './modules/admin/location-types/location-types.module';
import { AdminLocationsModule } from './modules/admin/locations/locations.module';
import { RoomModule } from './modules/admin/room/room.module';
import { UsersModule } from './modules/admin/users/users.module';
import { BaseCityRepository } from './modules/base/cities/city.repository';
import { BaseLocationTypeRepository } from './modules/base/location-types/location-type.repository';
import { CustomerAuthModule } from './modules/customer/auth/auth.module';
import { BookingHistoriesModule } from './modules/customer/booking-histories/booking-histories.module';
import { CustomerFacilitiesModule } from './modules/customer/facilities/facilities.module';
import { CustomerLocationsModule } from './modules/customer/locations/locations.module';
import { CustomerRoomsModule } from './modules/customer/rooms/rooms.module';
import { CustomerUsersModule } from './modules/customer/users/users.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { SuperAdminAuthModule } from './modules/super-admin/auth/auth.module';
import { LocationsModule as SuperAdminLocationsModule } from './modules/super-admin/locations/locations.module';
import { SuperAdminUsersModule } from './modules/super-admin/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BaseLocationTypeRepository, BaseCityRepository]),

    CustomerUsersModule,
    CustomerAuthModule,
    CustomerFacilitiesModule,
    CustomerLocationsModule,
    CustomerRoomsModule,

    AdminLocationsModule,
    AdminLocationTypesModule,
    AdminAuthModule,
    AdminBookingsModule,

    SuperAdminLocationsModule,
    SuperAdminUsersModule,
    SuperAdminAuthModule,
    UsersModule,
    BookingHistoriesModule,
    RoomModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Adapter],
})
export class AppModule {}
