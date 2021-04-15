import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseUsersService } from '../../../modules/base/user/users.service';
import { SuperAdminUserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-uat.dto';
import {
  AuthResponse,
  JwtBody,
} from '../../../modules/customer/auth/auth.service';
import { User } from '../../../entities/user.entity';
import PasswordServices from '../../../services/service.password';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SuperAdminUsersService extends BaseUsersService {
  passwordServices: typeof PasswordServices;
  constructor(
    private readonly superAdminUserRepository: SuperAdminUserRepository,
    private readonly jwtService: JwtService,
  ) {
    super(superAdminUserRepository);
    this.passwordServices = PasswordServices;
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const existUser = await this.superAdminUserRepository.findOneByEmail(
      createUserDto.email,
    );
    if (existUser) {
      throw new BadRequestException('User already exist');
    }

    const newUser = new User();
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;

    newUser.password = this.passwordServices.hashSync(createUserDto.password);

    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    await newUser.save();

    delete newUser.password;
    const jwtBody: JwtBody = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken: string = this.jwtService.sign(jwtBody);
    return {
      user: newUser,
      accessToken,
      success: true,
    };
  }
}
