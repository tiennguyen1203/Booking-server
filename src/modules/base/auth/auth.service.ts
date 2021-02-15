import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import PasswordServices from '../../../services/service.password';
import { BaseUserRepository } from '../user/user.repository';
@Injectable()
export class BaseAuthService {
  passwordServices: typeof PasswordServices;
  constructor(
    @InjectRepository(BaseUserRepository)
    private readonly baseUserRepository: BaseUserRepository,
  ) {
    this.passwordServices = PasswordServices;
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const user: User = await this.baseUserRepository
      .createQueryBuilder('users')
      .where({ email })
      .addSelect('users.password')
      .getOne();
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isCorrectPassword: boolean = this.passwordServices.compareSync(
      password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    delete user.password;
    return user;
  }
}
