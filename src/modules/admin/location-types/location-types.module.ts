import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLocationTypeRepository } from './location-type.repository';
import { AdminLocationTypesController } from './location-types.controller';
import { AdminLocationTypesService } from './location-types.service';

@Module({
  controllers: [AdminLocationTypesController],
  providers: [AdminLocationTypesService],
  imports: [TypeOrmModule.forFeature([AdminLocationTypeRepository])],
})
export class AdminLocationTypesModule {}
