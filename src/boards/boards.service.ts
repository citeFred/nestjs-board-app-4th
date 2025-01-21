import { Injectable } from '@nestjs/common';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
    // 데이터베이스
    private boards: Board[] = [];

    // 게시글 조회 기능
    getAllBoards(): Board[] {
        return this.boards;
    }
}
