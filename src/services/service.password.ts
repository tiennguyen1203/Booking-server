import * as bcrypt from 'bcrypt';
import { config } from 'src/config/config.service';

class PasswordServices {
  round: string | number;
  constructor() {
    this.round = parseInt(config.password.salt);
  }

  hash(password): Promise<string> {
    return bcrypt.hash(password, this.round);
  }

  hashSync(password): string {
    return bcrypt.hashSync(password, this.round);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  compareSync(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default new PasswordServices();
