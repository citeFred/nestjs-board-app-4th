import { createPool, Pool } from 'mysql2/promise'; // mysql2/promise에서 임포트
import { databaseConfig } from '../configs/database.config'; // 데이터베이스 설정 임포트
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Board } from './boards.entity';

@Injectable()
export class BoardsRepository {
    private connectionPool: Pool;

    constructor() {
        this.connectionPool = createPool(databaseConfig);
        this.connectionPool.getConnection()
            .then(() => console.log('Database connected successfully'))
            .catch(err => console.error('Database connection failed:', err));
    }

    async findAll(): Promise<Board[]> {
        const selectQuery = `SELECT * FROM board`;
        
        try {
            const [results] = await this.connectionPool.query(selectQuery);
            return results as Board[] || [];
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }

    async saveBoard(board: Board): Promise<string> {
        const insertQuery = `INSERT INTO board (author, title, contents, status) VALUES (?, ?, ?, ?)`;
        
        try {
            const result = await this.connectionPool.query(insertQuery, [board.author, board.title, board.contents, board.status]);
            const message = 'Article created successfully.'
            return message;
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }
}