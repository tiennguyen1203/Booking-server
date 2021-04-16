import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../../config/config.service';
import { SuperAdminUserRepository } from './user.repository';
import { SuperAdminUsersController } from './users.controller';
import { SuperAdminUsersService } from './users.service';
import { BaseLocationRepository } from '../../base/locations/location.repository';

@Module({
  controllers: [SuperAdminUsersController],
  providers: [SuperAdminUsersService],
  imports: [
    TypeOrmModule.forFeature([
      SuperAdminUserRepository,
      BaseLocationRepository,
    ]),
    JwtModule.register({
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: 3600 },
    }),
  ],
})
export class SuperAdminUsersModule {}
