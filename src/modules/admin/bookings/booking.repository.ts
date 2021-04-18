import { BookingRepository } from '../../base/locations/booking.repository';
import { EntityRepository } from 'typeorm';
import { Booking } from '../../../entities/booking.entity';

@EntityRepository(Booking)
export class AdminBookingRepository extends BookingRepository {}
