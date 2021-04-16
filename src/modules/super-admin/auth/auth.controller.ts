import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInCredentialsDto } from '../../../dto/auth/sign-in-credentials.dto';
import { SuperAdminAuthService } from './auth.service';

@Controller('super-admin/auth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminAuthService: SuperAdminAuthService) {}

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInCredentialsDto: SignInCredentialsDto): any {
    return this.superAdminAuthService.signIn(signInCredentialsDto);
  }
}
