import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Article]), // Article 엔터티를 TypeORM 모듈에 등록
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
