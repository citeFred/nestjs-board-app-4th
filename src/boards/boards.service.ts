import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Board } from './boards.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
    // Repository 계층 DI
    constructor(private boardRepository : BoardsRepository){}


    // 게시글 조회 기능
    async getAllBoards(): Promise<Board[]> {
        const foundBoards = await this.boardRepository.findAll();
        return foundBoards;
    }

    // // 특정 게시글 조회 기능
    // getBoardDetailById(id: number): Board {
    //     const foundBoard = this.boards.find((board) => board.id == id)
    //     if(!foundBoard) {
    //         throw new NotFoundException(`Board with ID ${id} not found`);
    //     }

    //     return foundBoard;
    // }

    // // 키워드(작성자)로 검색한 게시글 조회 기능
    // getBoardsByKeyword(author: string): Board[] {
    //     if (!author) {
    //         throw new BadRequestException('Author keyword must be provided');
    //     }

    //     const foundBoards = this.boards.filter((board) => board.author === author);

    //     if (foundBoards.length === 0) {
    //         throw new NotFoundException(`No boards found for author: ${author}`);
    //     }

    //     return foundBoards;
    // }

    // 게시글 작성 기능
    async createBoard(createBoardDto: CreateBoardDto): Promise<string> {
        const { author, title, contents } = createBoardDto;

        if (!author || !title || !contents) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }
        const board: Board = {
            id: 0, // 임시 초기화
            author, // author: createBoardDto.author
            title,
            contents,
            status: BoardStatus.PUBLIC
        };
        
        const createdBoard = await this.boardRepository.saveBoard(board);
        return createdBoard;
    }
    
    // // 특정 번호의 게시글 수정
    // updateBoardById(id: number, updateBoardDto: UpdateBoardDto): Board {
    //     const foundBoard = this.getBoardDetailById(id);
    //     const { title, contents } = updateBoardDto;

    //     if (!title || !contents) {
    //         throw new BadRequestException('Title and contents must be provided');
    //     }
    //     foundBoard.title = title;
    //     foundBoard.contents = contents;

    //     return foundBoard;
    // }


    // // 특정 번호의 게시글 일부 수정
    // updateBoardStatusById(id: number, status: BoardStatus): Board {
    //     const foundBoard = this.getBoardDetailById(id);
    //     if (foundBoard.status === status) {
    //         throw new BadRequestException(`This board is already in ${status} status`);
    //     }
    //     foundBoard.status = status;

    //     return foundBoard;
    // }

    // // 게시글 삭제 기능
    // deleteBoardById(id: number): void {
    //     const foundBoard = this.getBoardDetailById(id);
    //     this.boards = this.boards.filter((board) => board.id != id);
    // }
}
