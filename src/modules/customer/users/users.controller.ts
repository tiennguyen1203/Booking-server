import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCustomer } from '../../../decorators/auth-customer.decorator';
import { JwtBody } from '../auth/auth.service';
import { CustomerUsersService } from './users.service';

@Controller('customer/users')
export class CustomerUsersController {
  constructor(private readonly customerUsersService: CustomerUsersService) {}
  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@AuthCustomer() user: JwtBody) {
    return this.customerUsersService.getMe(user.id);
  }
}
