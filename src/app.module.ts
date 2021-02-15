import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AdminLocationTypesModule } from './modules/admin/location-types/location-types.module';
import { AdminLocationsModule } from './modules/admin/locations/locations.module';
import { CustomerAuthModule } from './modules/customer/auth/auth.module';
import { CustomerUsersModule } from './modules/customer/users/users.module';
import { LocationsModule as SuperAdminLocationsModule } from './modules/super-admin/locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),

    CustomerUsersModule,
    CustomerAuthModule,

    AdminLocationsModule,
    AdminLocationTypesModule,

    SuperAdminLocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
