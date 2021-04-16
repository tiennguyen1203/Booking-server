import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { AdminJwtBody } from '../auth/interfaces/index';
import { AdminUsersService } from './users.service';

@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@AuthAdmin() user: AdminJwtBody) {
    return this.adminUsersService.getMe(user.id);
  }
}
