import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/model/task.entity';
import { User } from '../user/model/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-217-235-87.eu-west-1.compute.amazonaws.com',
  port: 5432,
  username: 'ufkvamucpoxhcc',
  password: '941bd9645c2ea8058009f81502378ab440326f9ca2fba615d5ced7524fb33384',
  database: 'dcsag4rhbdm3it',
  ssl: true,
  entities: [Task, User],
  synchronize: true,
};