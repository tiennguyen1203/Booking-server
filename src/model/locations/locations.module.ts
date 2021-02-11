import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule { }
