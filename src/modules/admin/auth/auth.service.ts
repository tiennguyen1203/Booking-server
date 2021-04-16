import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from 'src/dto/auth/sign-in-credentials.dto';
import { Role } from '../../../constant';
import { BaseAuthService } from '../../../modules/base/auth/auth.service';
import { BaseLocationRepository } from '../../base/locations/location.repository';
import { AdminUserRepository } from '../users/user.repository';
import { AdminJwtBody, AuthResponse } from './interfaces/index';

@Injectable()
export class AdminAuthService extends BaseAuthService {
  constructor(
    @InjectRepository(AdminUserRepository)
    private readonly adminUserRepository: AdminUserRepository,
    private readonly jwtService: JwtService,
    private readonly baseLocationRepository: BaseLocationRepository,
  ) {
    super(adminUserRepository);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<AuthResponse> {
    const user = await this.validateUser(signInCredentialsDto);
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Only allow Admin');
    }

    const location = await this.baseLocationRepository.findOne({
      where: { userId: user.id },
    });
    const jwtBody: AdminJwtBody = {
      id: user.id,
      email: user.email,
      role: user.role,
      location,
    };

    const accessToken: string = this.jwtService.sign(jwtBody);

    return {
      user,
      accessToken,
      success: true,
    };
  }
}
