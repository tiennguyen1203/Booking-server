import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../constant';
import { SignInCredentialsDto } from 'src/dto/auth/sign-in-credentials.dto';
import { User } from '../../../entities';
import { BaseAuthService } from '../../../modules/base/auth/auth.service';
import { SuperAdminUserRepository } from '../users/user.repository';

export interface JwtBody {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  success: boolean;
}

@Injectable()
export class SuperAdminAuthService extends BaseAuthService {
  constructor(
    @InjectRepository(SuperAdminUserRepository)
    private readonly superAdminUserRepository: SuperAdminUserRepository,
    private readonly jwtService: JwtService,
  ) {
    super(superAdminUserRepository);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<AuthResponse> {
    const user = await this.validateUser(signInCredentialsDto);
    if (user.role !== Role.SUPER_ADMIN) {
      throw new UnauthorizedException('Only allow Super admin');
    }

    const jwtBody: JwtBody = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken: string = this.jwtService.sign(jwtBody);

    return {
      user,
      accessToken,
      success: true,
    };
  }
}
