import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBookingRepository } from './booking.repository';
import { AdminBookingsController } from './bookings.controller';
import { AdminBookingsService } from './bookings.service';

@Module({
  controllers: [AdminBookingsController],
  providers: [AdminBookingsService],
  imports: [TypeOrmModule.forFeature([AdminBookingRepository])],
})
export class AdminBookingsModule {}
