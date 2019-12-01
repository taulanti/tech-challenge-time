import { ConfigService } from './config.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/model/task.entity';
import { User } from 'src/user/model/user.entity';

@Injectable()
export class ConfigDatabaseService implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'postgres' as 'postgres',
      host: this.DB_HOST,
      port: this.DB_PORT,
      username: this.DB_USER,
      password: this.DB_PASSWORD,
      database: this.DB_NAME,
      ssl: this.DB_SYNCHRONIZE,
      synchronize: this.DB_SYNCHRONIZE,
      // entities: [
      //   __dirname + '/../../common/entity/*.ts',
      // ],
      entities: [Task, User],
      keepConnectionAlive: true,
    };
  }

  get DB_HOST(): string {
    return this.configService.get('DATABASE_HOST');
  }

  get DB_PORT(): number {
    return parseInt(this.configService.get('DATABASE_PORT'));
  }

  get DB_NAME(): string {
    return this.configService.get('DATABASE_NAME');
  }

  get DB_USER(): string {
    return this.configService.get('DATABASE_USERNAME');
  }

  get DB_PASSWORD(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }

  get DB_SSL(): boolean {
    return Boolean(this.configService.get('DATABASE_SSL'));
  }

  get DB_SYNCHRONIZE(): boolean {
    return Boolean(this.configService.get('DATABASE_SYNCHRONIZE'));
  }

  get NODE_ENV(): boolean {
    return Boolean(this.configService.get('NODE_ENV'));
  }

}
