import { Module } from '@nestjs/common';
import { BookingHistoriesController } from './booking-histories.controller';
import { BookingHistoriesService } from './booking-histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseBookingRepository } from '../../base/booking/booking.repository';

@Module({
  controllers: [BookingHistoriesController],
  providers: [BookingHistoriesService],
  imports: [
    TypeOrmModule.forFeature([
      BaseBookingRepository,
    ]),
  ],
})
export class BookingHistoriesModule {}
