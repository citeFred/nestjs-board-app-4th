import { User } from "src/auth/users.entity";
import { BoardStatus } from "../boards-status.enum";
import { Board } from "../boards.entity";

export class BoardResponseDto {
    id: number;
    author: string;
    title: string;
    contents: string;
    status: BoardStatus;
    user: User;

    constructor(board: Board) {
        this.id = board.id;
        this.author = board.author;
        this.title = board.title;
        this.contents = board.contents;
        this.status = board.status;
        this.user = board.user;
    }
}