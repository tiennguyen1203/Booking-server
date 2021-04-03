import { EntityRepository, Repository } from 'typeorm';
import { City } from './../../../entities';

@EntityRepository(City)
export class BaseCityRepository extends Repository<City> {}
