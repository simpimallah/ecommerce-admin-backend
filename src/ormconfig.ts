import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, // must be string
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true,
  logging: false,
});
