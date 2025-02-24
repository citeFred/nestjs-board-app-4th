import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    exposedHeaders: ['Authorization']
  })

  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Application Running on Port: ${process.env.SERVER_PORT}`)
}
bootstrap();
