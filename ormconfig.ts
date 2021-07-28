import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { Category } from './src/entities/Category';
import { Unit } from './src/entities/Unit';
import { Base } from './src/entities/Base';
import { Task } from './src/entities/Task';
import { User } from './src/entities/User';
import { Progress } from './src/entities/Progress';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Base, Unit, Category, Task, Progress],
  logging: false,
};

module.exports = {
  ...ormConfig,
  seeds: [path.resolve(__dirname, './src/database/seeds/**/*{.ts,.js}')],
  migrations: [path.resolve(__dirname, './src/database/migrations/*.ts')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  factories: [
    path.resolve(__dirname, './src/database/factories/**/*{.ts,.js}'),
  ],
};
