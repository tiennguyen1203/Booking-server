import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../../config/config.service';
import { JwtStrategy } from '../../../modules/customer/auth/jwt.strategy';
import { SuperAdminUserRepository } from '../users/user.repository';
import { SuperAdminAuthController } from './auth.controller';
import { SuperAdminAuthService } from './auth.service';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
@Module({
  controllers: [SuperAdminAuthController],
  providers: [SuperAdminAuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([SuperAdminUserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: 3600 * 24 * 1000 },
    }),
    passportModule,
  ],
  exports: [passportModule],
})
export class SuperAdminAuthModule {}
