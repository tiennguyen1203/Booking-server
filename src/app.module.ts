import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AdminLocationTypesModule } from './modules/admin/location-types/location-types.module';
import { AdminLocationsModule } from './modules/admin/locations/locations.module';
import { BaseLocationTypeRepository } from './modules/base/location-types/location-type.repository';
import { CustomerAuthModule } from './modules/customer/auth/auth.module';
import { CustomerUsersModule } from './modules/customer/users/users.module';
import { LocationsModule as SuperAdminLocationsModule } from './modules/super-admin/locations/locations.module';
import { CustomerFacilitiesModule } from './modules/customer/facilities/facilities.module';
import { CustomerLocationsModule } from './modules/customer/locations/locations.module';
import { CustomerRoomsModule } from './modules/customer/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BaseLocationTypeRepository]),

    CustomerUsersModule,
    CustomerAuthModule,

    AdminLocationsModule,
    AdminLocationTypesModule,

    SuperAdminLocationsModule,

    CustomerFacilitiesModule,

    CustomerLocationsModule,

    CustomerRoomsModule,
  ],
})
export class AppModule {}
