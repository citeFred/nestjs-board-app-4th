import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleRequestDto } from './dto/create-article-request.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { SearchArticleResponseDto } from './dto/search-article-response.dto';
import { UpdateArticleRequestDto } from './dto/update-article-request.dto';
import { ArticleStatusValidationPipe } from './pipes/article-status-validation.pipe';
import { ArticleStatus } from './article-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/custom-role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('api/articles')
@UseGuards(AuthGuard(), RolesGuard)
export class ArticleController {
    private readonly logger = new Logger(ArticleController.name);

    // 생성자 주입
    constructor(private articleService: ArticleService){}

    // 게시글 작성 기능
    @Post('/')
    async createArticle(@Body() createArticleRequestDto: CreateArticleRequestDto, @GetUser() logginedUser: User): Promise<ArticleResponseDto> {
        this.logger.verbose(`User: ${logginedUser.username} is try to creating a new article with title: ${createArticleRequestDto.title}`);

        const articleResponseDto = new ArticleResponseDto(await this.articleService.createArticle(createArticleRequestDto, logginedUser))

        this.logger.verbose(`Article title with ${articleResponseDto.title} created Successfully`);
        return articleResponseDto;
    }

    // 게시글 조회 기능
    @Get('/')
    @Roles(UserRole.USER)
    async getAllArticles(): Promise<ArticleResponseDto[]> {
        this.logger.verbose(`Try to Retrieving all Articles`);

	    const articles: Article[] = await this.articleService.getAllArticles();
        const articlesResponseDto = articles.map(article => new ArticleResponseDto(article));

        this.logger.verbose(`Retrieved all articles list Successfully`);
        return articlesResponseDto;
    }

    // 나의 게시글 조회 기능(로그인 유저)
    @Get('/myarticles')
    async getMyAllArticles(@GetUser() logginedUser: User): Promise<ArticleResponseDto[]> {
        this.logger.verbose(`Try to Retrieving ${logginedUser.username}'s all Articles`);

        const articles: Article[] = await this.articleService.getMyAllArticles(logginedUser);
        const articlesResponseDto = articles.map(article => new ArticleResponseDto(article));

        this.logger.verbose(`Retrieved ${logginedUser.username}'s all Articles list Successfully`);
        return articlesResponseDto;
    }

    // 특정 게시글 조회 기능
    @Get('/:id')
    async getArticleDetailById(@Param('id') id: number): Promise<ArticleResponseDto> {
        this.logger.verbose(`Try to Retrieving a article by id: ${id}`);

        const articleResponseDto = new ArticleResponseDto(await this.articleService.getArticleDetailById(id));

        this.logger.verbose(`Retrieved a article by ${id} details Successfully`);
        return articleResponseDto;
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    @Get('/search/:keyword')
    async getArticlesByKeyword(@Query('author') author: string): Promise<SearchArticleResponseDto[]> {
        this.logger.verbose(`Try to Retrieving a article by author: ${author}`);

        const articles: Article[] = await this.articleService.getArticlesByKeyword(author);
        const articlesResponseDto = articles.map(article => new SearchArticleResponseDto(article));

        this.logger.verbose(`Retrieved articles list by ${author} Successfully`);
        return articlesResponseDto;
    }

    // 특정 번호의 게시글 수정
    @Put('/:id')
    async updateArticleById(
        @Param('id') id: number,
        @Body() updateArticleRequestDto: UpdateArticleRequestDto): Promise<ArticleResponseDto> {
        this.logger.verbose(`Try to Updating a article by id: ${id} with updateArticleRequestDto`);

        const articleResponseDto = new ArticleResponseDto(await this.articleService.updateArticleById(id, updateArticleRequestDto))

        this.logger.verbose(`Updated a article by ${id} Successfully`);
        return articleResponseDto;
    }

    // 특정 번호의 게시글 일부 수정<ADMIN 기능>
    @Patch('/:id')
    @Roles(UserRole.ADMIN)
    async updateArticleStatusById(
        @Param('id') id: number,
        @Body('status', ArticleStatusValidationPipe) status: ArticleStatus): Promise<void> {
        this.logger.verbose(`ADMIN is trying to Updating a article by id: ${id} with status: ${status}`);

        await this.articleService.updateArticleStatusById(id, status);

        this.logger.verbose(`ADMIN Updated a article's by ${id} status to ${status} Successfully`);
    }

    // 게시글 삭제 기능
    @Delete('/:id')
    @Roles(UserRole.USER, UserRole.ADMIN)
    async deleteArticleById(@Param('id') id: number, @GetUser() logginedUser: User): Promise<void> {
        this.logger.verbose(`User: ${logginedUser.username} is trying to Deleting a article by id: ${id}`);

        await this.articleService.deleteArticleById(id, logginedUser);

        this.logger.verbose(`Deleted a article by id: ${id} Successfully`);
    }
}