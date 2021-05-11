import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QueryParamsPipe } from 'src/pipes';
import { AuthCustomer } from '../../../decorators/auth-customer.decorator';
import { JwtBody } from '../auth/auth.service';
import { CustomerUsersService } from './users.service';
import { UpdateUserDto } from '../../../dto/user/update-user.dto';

@Controller('customer/users')
export class CustomerUsersController {
  constructor(private readonly customerUsersService: CustomerUsersService) {}
  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@AuthCustomer() user: JwtBody) {
    return this.customerUsersService.getMe(user.id);
  }

  @Put('/me')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  updateMe(
    @AuthCustomer() user: JwtBody,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.customerUsersService.updateMe(user.id, updateUserDto);
  }
}
