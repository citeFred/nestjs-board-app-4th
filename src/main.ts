import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    exposedHeaders: ['Authorization']
  })

  await app.listen(process.env.PORT);
  Logger.log(`Application Running on Port: ${process.env.PORT}`)
}
bootstrap();
