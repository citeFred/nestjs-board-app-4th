import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { createPool, Pool } from "mysql2/promise";
import { databaseConfig } from "../configs/database.config";
import { Board } from "./boards.entity";

@Injectable()
export class BoardsRepository {
    private connectionPool: Pool

    constructor() {
        this.connectionPool = createPool(databaseConfig);
        this.connectionPool.getConnection()
            .then(() => console.log('DB Connected'))
            .catch(err => console.error('DB connection faild', err));
    }

    // 게시글 조회관련 데이터 액세스
    async findAll(): Promise<Board[]> {
        const selectQuery = `SELECT * FROM board`;
        try {
            const [result]= await this.connectionPool.query(selectQuery);
            return result as Board[]
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }

    // 게시글 작성관련 데이터 액세스
    async saveBoard(board: Board): Promise<string> {
        const insertQuery = `INSERT INTO board(author, title, contents, status) VALUES (?, ?, ?, ?)`;
        try {
            const result = await this.connectionPool.query(insertQuery, [board.author, board.title, board.contents, board.status])
            const message = "Created success!"
            return message;
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }
}