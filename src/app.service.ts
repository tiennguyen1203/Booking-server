import { Injectable, Redirect } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Move to /docs to get APIs son of bitch!';
  }
}
