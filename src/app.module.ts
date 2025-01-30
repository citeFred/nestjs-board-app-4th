import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorization.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ]
})
export class AppModule {}