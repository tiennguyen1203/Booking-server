import { Module } from '@nestjs/common';
import { AdminUsersController } from './users.controller';
import { AdminUsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserRepository } from './user.repository';
import { BaseLocationRepository } from '../../base/locations/location.repository';

@Module({
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  imports: [
    TypeOrmModule.forFeature([AdminUserRepository, BaseLocationRepository]),
  ],
})
export class UsersModule {}
