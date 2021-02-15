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

export const AuthAdmin = createParamDecorator(
  (data, input: ExecutionContext): JwtBody => {
    const req: RequestIncomingMessage = input.switchToHttp().getRequest();
    if (req.authInfo instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    if (req.user?.role !== Role.LOCATIONS_OWNER) {
      throw new ForbiddenException('Only allow Admin (Locations Owner) role');
    }

    return req.user;
  },
);
