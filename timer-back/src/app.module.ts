import { Module, Inject } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typorm.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigDatabaseService } from './config/config.database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigDatabaseService,
    }),

    TasksModule,
    UserModule,
    ConfigModule
  ]
})
export class AppModule {

  static port: number;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = parseInt(_configService.get('APPLICATION_PORT'));
  }
}
