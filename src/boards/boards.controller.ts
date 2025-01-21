import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';

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

    // 키워드(작성자)로 검색한 게시글 조회 기능
    @Get('/search/:keyword')
    getBoardsByKeyword(@Query('author') author: string): Board[] {
        return this.boardsService.getBoardsByKeyword(author);
    }

    // 게시글 작성 기능
    @Post('/')
    createBoard(@Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
    }
}
