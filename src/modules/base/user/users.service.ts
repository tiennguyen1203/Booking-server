import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { BaseUserRepository } from './user.repository';

@Injectable()
export class BaseUsersService {
  constructor(private readonly baseUserRepository: BaseUserRepository) {}

  getMe(userId: string): Promise<User> {
    return this.baseUserRepository.findOne(userId);
  }
}
