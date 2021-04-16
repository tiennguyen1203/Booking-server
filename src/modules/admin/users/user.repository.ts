import { User } from '../../../entities';
import { BaseUserRepository } from '../../../modules/base/user/user.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class AdminUserRepository extends BaseUserRepository {}
