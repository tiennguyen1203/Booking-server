import { EntityRepository, Repository } from 'typeorm';
import { Booking } from './../../../entities';

@EntityRepository(Booking)
export class BaseBookingRepository extends Repository<Booking> {}
