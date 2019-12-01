import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigDatabaseService } from './config.database.service';
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: () => {
        return new ConfigService(`${__dirname}/development.env`);
      },
    },
    ConfigDatabaseService,
  ],
  exports: [ConfigService, ConfigDatabaseService,],
})
export class ConfigModule {}