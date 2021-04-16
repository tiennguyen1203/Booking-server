import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthResponse } from 'src/modules/customer/auth/auth.service';
import { SignInCredentialsDto } from '../../../dto/auth/sign-in-credentials.dto';
import { AdminAuthService } from './auth.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly superAdminAuthService: AdminAuthService) {}

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<AuthResponse> {
    return this.superAdminAuthService.signIn(signInCredentialsDto);
  }
}
