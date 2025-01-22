import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Board } from './boards.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
    // DB Access (Repository 계층)
    constructor(private boardsRepository: BoardsRepository) {}

    // 게시글 조회 기능
    async getAllBoards(): Promise<Board[]> {
        const foundBoards = await this.boardsRepository.findAll(); // 데이터베이스에서 모든 게시글을 가져오는 메서드
        return foundBoards; // boards가 undefined일 경우 오류 발생
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
        const { author, title, contents } = createBoardDto; // 구조분해할당 표현식 권장됨

        if (!author || !title || !contents) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }
        const newBoard: Board = {
            id: 0, // Temporary ID
            author, // 구조분해전 기존 표현으로는 author: createBoardDto.author
            title, // 구조분해전 기존 표현으로는 author: createBoardDto.title
            contents, // 구조분해전 기존 표현으로는 author: createBoardDto.contents
            status: BoardStatus.PUBLIC,
        };

        const createdBoard = await this.boardsRepository.saveBoard(newBoard); 

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
