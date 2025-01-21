import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';

@Controller('api/boards')
export class BoardsController {
    // 생성자 주입
    constructor(private boardsService: BoardsService){}

    // 게시글 조회 기능
    @Get('/')
    getAllBoards(): Board[] {
	    return this.boardsService.getAllBoards();
    }

    // 특정 게시글 조회 기능
    @Get('/:id')
    getBoardDetailById(@Param('id') id: number): Board {
        return this.boardsService.getBoardDetailById(id);
    }

    // 게시글 작성 기능
    @Post('/')
    createBoard(
        @Body('author') author: string,
        @Body('title') title: string,
        @Body('contents') contents: string,
    ) {
        return this.boardsService.createBoard(author, title, contents);
    }
}
