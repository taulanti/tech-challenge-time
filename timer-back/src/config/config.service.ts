import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { Task } from '../tasks/model/task.entity';
import { User } from '../user/model/user.entity';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      DATABASE_TYPE: Joi.string(),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.string(),
      DATABASE_USERNAME: Joi.string(),
      DATABASE_PASSWORD: Joi.string(),
      DATABASE_NAME: Joi.string(),
      DATABASE_SSL: Joi.string(),
      DATABASE_SYNCHRONIZE: Joi.string(),
      APPLICATION_PORT: Joi.string(),
      JWT_SECRET: Joi.string(),
      TOKEN_EXPIRATION: Joi.string()
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}