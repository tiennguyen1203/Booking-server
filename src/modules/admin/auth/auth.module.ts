import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../../config/config.service';
import { JwtStrategy } from '../../../modules/customer/auth/jwt.strategy';
import { AdminUserRepository } from '../users/user.repository';
import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';
import { BaseLocationRepository } from '../../base/locations/location.repository';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
@Module({
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([AdminUserRepository, BaseLocationRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: 3600 },
    }),
    passportModule,
  ],
  exports: [passportModule],
})
export class AdminAuthModule {}
