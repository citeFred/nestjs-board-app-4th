import { Injectable } from '@nestjs/common';
import { Board } from './boards.entity';
import { BoardStatus } from './boards-status.enum';

@Injectable()
export class BoardsService {
    // 데이터베이스
    private boards: Board[] = [];

    // 게시글 조회 기능
    getAllBoards(): Board[] {
        return this.boards;
    }

    // 게시글 작성 기능
    createBoard(author: string, title: string, contents: string) {
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
}
