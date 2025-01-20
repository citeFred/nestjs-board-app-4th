import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
