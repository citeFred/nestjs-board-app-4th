import { BoardStatus } from "./boards-status.enum";

export class Board {
    id: number;
    author: string;
    title: string;
    contents: string;
    status: BoardStatus
}