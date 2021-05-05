import { EntityRepository, Repository } from 'typeorm';
import { BookingHistory } from './../../../entities';

@EntityRepository(BookingHistory)
export class BaseBookingHistoryRepository extends Repository<BookingHistory> {}
