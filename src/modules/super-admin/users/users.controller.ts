import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SuperAdminUsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthSuperAdmin } from '../../../decorators/auth-super-admin.decorator';
import { JwtBody } from '../../../modules/customer/auth/auth.service';
import { CreateUserDto } from './dto/create-uat.dto';

@Controller('super-admin/users')
export class SuperAdminUsersController {
  constructor(
    private readonly superAdminUsersService: SuperAdminUsersService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createUser(
    @AuthSuperAdmin() _: JwtBody,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.superAdminUsersService.createUser(createUserDto);
  }
}
