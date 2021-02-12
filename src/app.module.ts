import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { LocationTypesModule } from './routes/admin/location-types/location-types.module';
import { LocationsModule as AdminLocationsModule } from './routes/admin/locations/locations.module';
import { LocationsModule as CustomerLocationsModule } from './routes/customer/locations/locations.module';
import { LocationsModule } from './routes/super-admin/locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    LocationTypesModule,
    AdminLocationsModule,
    CustomerLocationsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
