import { Board } from "../boards.entity";

export class BoardSearchResponseDto {
    author: string;
    title: string;
    contents: string;

    constructor(board: Board) {
        this.author = board.author;
        this.title = board.title;
        this.contents = board.contents;
    }
}