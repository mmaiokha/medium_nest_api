import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_POST),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + 'migrations/**/*{.ts,.js}']
};

export default typeormConfig;
