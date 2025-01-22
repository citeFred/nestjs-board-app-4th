import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards-status.enum';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('api/boards')
@UsePipes(ValidationPipe)
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

    // 특정 번호의 게시글 수정
    @Put('/:id')
    updateBoardById(
        @Param('id') id: number,
        @Body() updateBoardDto: UpdateBoardDto): Board {
        return this.boardsService.updateBoardById(id, updateBoardDto)
    }

    // 특정 번호의 게시글 일부 수정
    @Patch('/:id')
    updateBoardStatusById(
        @Param('id') id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
        return this.boardsService.updateBoardStatusById(id, status);
    }

    // 게시글 삭제 기능
    @Delete('/:id')
    deleteBoardById(@Param('id') id: number): void {
        this.boardsService.deleteBoardById(id);
    }
}
