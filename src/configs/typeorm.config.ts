import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 파일의 위치
    synchronize: true, // 개발중에만 true로 설정
    logging: true, // SQL 로그가 출력
};