import { Board } from "../boards.entity";

export class BoardResponseDto {
    title: string;
    contents: string;

    constructor(board: Board) {
        this.title = board.title;
        this.contents = board.contents;
    }
}