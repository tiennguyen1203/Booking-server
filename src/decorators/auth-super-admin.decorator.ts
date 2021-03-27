import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Role } from '../constant';
import { JwtBody } from '../modules/customer/auth/auth.service';

export interface RequestIncomingMessage extends IncomingMessage {
  user: JwtBody;
  authInfo: Error | undefined;
}

export const AuthSuperAdmin = createParamDecorator(
  (data, input: ExecutionContext): JwtBody => {
    const req: RequestIncomingMessage = input.switchToHttp().getRequest();
    if (req.authInfo instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    if (req.user?.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('Only allow super-admin role');
    }

    return req.user;
  },
);
