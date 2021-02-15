import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from 'src/dto/auth/sign-in-credentials.dto';
import { SignUpCredentialsDto } from 'src/dto/auth/sign-up-credentials.dto';
import { User } from '../../../entities';
import { BaseAuthService } from '../../../modules/base/auth/auth.service';
import { CustomerUserRepository } from '../users/user.repository';

export interface JwtBody {
  id: string;
  email: string;
  role: string;
}

export interface SignInResponse {
  user: User;
  accessToken: string;
}

@Injectable()
export class CustomerAuthService extends BaseAuthService {
  constructor(
    @InjectRepository(CustomerUserRepository)
    private readonly customerUserRepository: CustomerUserRepository,
    private readonly jwtService: JwtService,
  ) {
    super(customerUserRepository);
  }

  async signUp(signUpCredentialsDto: SignUpCredentialsDto) {
    const user: User = await this.customerUserRepository.findOneByEmail(
      signUpCredentialsDto.email,
    );
    if (user) {
      throw new BadRequestException(
        `User with email: ${signUpCredentialsDto.email} already exist`,
      );
    }

    const newUser: User = new User();

    for (const element in signUpCredentialsDto) {
      newUser[element] = signUpCredentialsDto[element];
    }

    newUser.password = this.passwordServices.hashSync(
      signUpCredentialsDto.password,
    );

    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    await newUser.save();

    delete newUser.password;
    return newUser;
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<SignInResponse> {
    const user = await this.validateUser(signInCredentialsDto);

    const jwtBody: JwtBody = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken: string = this.jwtService.sign(jwtBody);

    return {
      user,
      accessToken,
    };
  }
}
