import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInCredentialsDto } from '../../../dto/auth/sign-in-credentials.dto';
import { SignUpCredentialsDto } from '../../../dto/auth/sign-up-credentials.dto';
import { CustomerAuthService } from './auth.service';

@Controller('customer/auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
    return this.customerAuthService.signUp(signUpCredentialsDto);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInCredentialsDto: SignInCredentialsDto): any {
    return this.customerAuthService.signIn(signInCredentialsDto);
  }
}
