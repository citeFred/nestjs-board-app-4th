import * as dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

export const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    insecureAuth: true,
};
