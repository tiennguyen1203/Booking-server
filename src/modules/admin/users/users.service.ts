import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseUsersService } from '../../base/user/users.service';
import { AdminUserRepository } from './user.repository';
import { User } from '../../../entities/user.entity';
import { BaseLocationRepository } from '../../base/locations/location.repository';
import { AdminGetMeResponse } from './interfaces/index';

@Injectable()
export class AdminUsersService extends BaseUsersService {
  constructor(
    private readonly adminUserRepository: AdminUserRepository,
    private readonly baseLocationRepository: BaseLocationRepository,
  ) {
    super(adminUserRepository);
  }

  async getMe(userId: string): Promise<AdminGetMeResponse> {
    // const location
    const user = await this.adminUserRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const location = await this.baseLocationRepository.findOne({
      where: { userId: user.id },
    });

    return {
      ...user,
      location,
    } as AdminGetMeResponse;
  }
}
