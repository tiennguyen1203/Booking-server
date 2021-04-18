import { EntityRepository, Repository } from 'typeorm';
import { BookingHistory } from '../../../entities/booking-history.entity';

@EntityRepository(BookingHistory)
export class BookingHistoryRepository extends Repository<BookingHistory> {}
