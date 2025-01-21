import { Injectable } from '@nestjs/common';
import { Board } from './boards.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    // 데이터베이스
    private boards: Board[] = [];

    // 게시글 조회 기능
    getAllBoards(): Board[] {
        return this.boards;
    }

    // 특정 게시글 조회 기능
    getBoardDetailById(id: number): Board {
        return this.boards.find((board) => board.id == id)
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    getBoardsByKeyword(author: string): Board[] {
        return this.boards.filter((board) => board.author === author);
    }

    // 게시글 작성 기능
    createBoard(createBoardDto: CreateBoardDto) {
        const {author, title, contents} = createBoardDto;

        const board: Board = {
            id: this.boards.length + 1, // 임시 Auto Increament 기능
            author,
            title,
            contents,
            status: BoardStatus.PUBLIC
        }
        const savedBoard = this.boards.push(board);
        return savedBoard;
    }


    deleteBoardById(id: number): void {
        this.boards = this.boards.filter((board) => board.id != id);
    }
}
