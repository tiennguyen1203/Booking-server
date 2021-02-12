import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      url: this.getValue('DATABASE_URL'),

      entities: [__dirname + '/../**/*.entity.{ts,js}'],

      migrationsTableName: 'migration',

      migrations: [__dirname + '/../db/migration/*.{ts,js}'],

      cli: {
        migrationsDir: __dirname + '/../db/migration',
      },

      ssl: this.isProduction()
        ? {
            rejectUnauthorized: false,
          }
        : null,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
]);

const config = {
  password: {
    salt: process.env.SALT,
  },
};

export { configService, config };
