import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { CustomerFacilityRepository } from './facility.repository';

@Module({
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  imports: [TypeOrmModule.forFeature([CustomerFacilityRepository])],
})
export class CustomerFacilitiesModule {}
