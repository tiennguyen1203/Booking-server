import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationTypeRepository } from './location-type.repository';
import { LocationTypesController } from './location-types.controller';
import { LocationTypesService } from './location-types.service';

@Module({
  controllers: [LocationTypesController],
  providers: [LocationTypesService],
  imports: [TypeOrmModule.forFeature([LocationTypeRepository])]
})
export class LocationTypesModule { }
