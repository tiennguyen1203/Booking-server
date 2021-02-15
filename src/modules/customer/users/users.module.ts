import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAuthModule } from '../auth/auth.module';
import { CustomerUserRepository } from './user.repository';
import { CustomerUsersController } from './users.controller';
import { CustomerUsersService } from './users.service';

@Module({
  controllers: [CustomerUsersController],
  providers: [CustomerUsersService],
  imports: [
    TypeOrmModule.forFeature([CustomerUserRepository]),
    CustomerAuthModule,
  ],
})
export class CustomerUsersModule {}
