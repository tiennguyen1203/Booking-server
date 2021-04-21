import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../../config/config.service';
import { CustomerUserRepository } from '../users/user.repository';
import { CustomerAuthController } from './auth.controller';
import { CustomerAuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
@Module({
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([CustomerUserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: 3600 * 24 * 1000 },
    }),
    passportModule,
  ],
  exports: [passportModule],
})
export class CustomerAuthModule {}
