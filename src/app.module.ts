import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AdminLocationTypesModule } from './modules/admin/location-types/location-types.module';
import { AdminLocationsModule } from './modules/admin/locations/locations.module';
import { BaseLocationTypeRepository } from './modules/base/location-types/location-type.repository';
import { CustomerAuthModule } from './modules/customer/auth/auth.module';
import { CustomerUsersModule } from './modules/customer/users/users.module';
import { LocationsModule as SuperAdminLocationsModule } from './modules/super-admin/locations/locations.module';
import { CustomerLocationsModule } from './modules/customer/locations/locations.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BaseLocationTypeRepository]),

    CustomerUsersModule,
    CustomerAuthModule,

    AdminLocationsModule,
    AdminLocationTypesModule,

    SuperAdminLocationsModule,

    CustomerLocationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
