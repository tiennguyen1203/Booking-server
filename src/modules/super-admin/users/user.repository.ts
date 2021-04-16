import { BaseUserRepository } from '../../../modules/base/user/user.repository';
import { EntityRepository } from 'typeorm';
import { User } from '../../../entities';

@EntityRepository(User)
export class SuperAdminUserRepository extends BaseUserRepository {}
