import { BoardStatus } from "./boards-status.enum";

export class Board {
    id: string;
    title: string;
    contents: string;
    status: BoardStatus
}