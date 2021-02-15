import { Injectable } from '@nestjs/common';
import { BaseUsersService } from '../../../modules/base/user/users.service';
import { CustomerUserRepository } from './user.repository';

@Injectable()
export class CustomerUsersService extends BaseUsersService {
  constructor(private readonly customerUserRepository: CustomerUserRepository) {
    super(customerUserRepository);
  }
}
