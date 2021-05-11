import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseUsersService } from '../../../modules/base/user/users.service';
import { CustomerUserRepository } from './user.repository';
import { UpdateUserDto } from '../../../dto/user/update-user.dto';

@Injectable()
export class CustomerUsersService extends BaseUsersService {
  constructor(private readonly customerUserRepository: CustomerUserRepository) {
    super(customerUserRepository);
  }

  async updateMe(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.customerUserRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    for (const item in updateUserDto) {
      user[item] = updateUserDto[item];
    }

    await user.save();
    return user;
  }
}
