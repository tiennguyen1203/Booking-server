import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBookingRepository } from './booking.repository';
import { AdminBookingsController } from './bookings.controller';
import { AdminBookingsService } from './bookings.service';
import { BaseUserRepository } from '../../base/user/user.repository';
import { BaseBookingHistoryRepository } from '../../base/booking-histories/booking-history.repository';

@Module({
  controllers: [AdminBookingsController],
  providers: [AdminBookingsService],
  imports: [
    TypeOrmModule.forFeature([
      AdminBookingRepository,
      BaseUserRepository,
      BaseBookingHistoryRepository,
    ]),
  ],
})
export class AdminBookingsModule {}
