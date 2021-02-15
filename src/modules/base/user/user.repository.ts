import { User } from '../../../entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class BaseUserRepository extends Repository<User> {
  findOneByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
