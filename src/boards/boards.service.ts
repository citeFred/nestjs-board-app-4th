import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Board } from './boards.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/auth/users.entity';

@Injectable()
export class BoardsService {
    private readonly logger = new Logger(BoardsService.name);

    constructor(
        @InjectRepository(Board)
        private boardRepository : Repository<Board>
    ){}

    // 게시글 작성 기능
    async createBoard(createBoardDto: CreateBoardDto, logginedUser: User): Promise<Board> {
        this.logger.verbose(`User: ${logginedUser.username} is creating a new board with title: ${createBoardDto.title}`);

        const { title, contents } = createBoardDto;
        if (!title || !contents) {
            throw new BadRequestException('Title, and contents must be provided');
        }
        const newBoard = this.boardRepository.create({
            author: logginedUser.username, 
            title,
            contents,
            status: BoardStatus.PUBLIC,
            user: logginedUser
        });

        const createdBoard = await this.boardRepository.save(newBoard);

        this.logger.verbose(`Board title with ${createdBoard.title} created Successfully`);
        return createdBoard;
    }

    // 게시글 조회 기능
    async getAllBoards(): Promise<Board[]> {
        this.logger.verbose(`Retrieving all Boards`);

        const foundBoards = await this.boardRepository.find();

        this.logger.verbose(`Retrieved all boards list Successfully`);
        return foundBoards;
    }

    // 로그인된 유저의 게시글 조회 기능
    async getMyAllBoards(logginedUser: User): Promise<Board[]> {
        this.logger.verbose(`Retrieving ${logginedUser.username}'s all Boards`);

        const foundBoards = await this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .where('board.userId = :userId', { userId : logginedUser.id })
            .getMany();

        this.logger.verbose(`Retrieved ${logginedUser.username}'s all Boards list Successfully`);
        return foundBoards;
    }

    // 특정 게시글 조회 기능
    async getBoardDetailById(id: number): Promise<Board> {
        this.logger.verbose(`Retrieving a board by id: ${id}`);

        const foundBoard = await this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .where('board.id = :id', { id })
            .getOne();

        if (!foundBoard) {
            throw new NotFoundException(`Board with ID ${id} not found`);
        }

        this.logger.verbose(`Retrieved a board by ${id} details Successfully`);
        return foundBoard;
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    async getBoardsByKeyword(author: string): Promise<Board[]> {
        this.logger.verbose(`Retrieving a board by author: ${author}`);

        if (!author) {
            throw new BadRequestException('Author keyword must be provided');
        }
        const foundBoards = await this.boardRepository.findBy({ author: author })
        if (foundBoards.length === 0) {
            throw new NotFoundException(`No boards found for author: ${author}`);
        }

        this.logger.verbose(`Retrieved boards list by ${author} Successfully`);
        return foundBoards;
    }
    
    // 특정 번호의 게시글 수정
    async updateBoardById(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
        this.logger.verbose(`Updating a board by id: ${id} with updateBoardDto`);

        const foundBoard = await this.getBoardDetailById(id);
        const { title, contents } = updateBoardDto;
        if (!title || !contents) {
            throw new BadRequestException('Title and contents must be provided');
        }
        foundBoard.title = title;
        foundBoard.contents = contents;
        const updatedBoard = await this.boardRepository.save(foundBoard)

        this.logger.verbose(`Updated a board by ${id} Successfully`);
        return updatedBoard;
    }

    // 특정 번호의 게시글 일부 수정
    async updateBoardStatusById(id: number, status: BoardStatus): Promise<void> {
        this.logger.verbose(`ADMIN is Updating a board by id: ${id} with status: ${status}`);

        const result = await this.boardRepository.update(id, { status });
        if (result.affected === 0) {
            throw new NotFoundException(`Board with ID ${id} not found`);
        }

        this.logger.verbose(`ADMIN Updated a board's by ${id} status to ${status} Successfully`);
    }

    // 게시글 삭제 기능
    async deleteBoardById(id: number, logginedUser: User): Promise<void> {
        this.logger.verbose(`User: ${logginedUser.username} is Deleting a board by id: ${id}`);

        const foundBoard = await this.getBoardDetailById(id);

        if (foundBoard.user.id !== logginedUser.id) {
            throw new UnauthorizedException('Do not have permission to delete this board')
        }
        await this.boardRepository.delete(foundBoard);

        this.logger.verbose(`Deleted a board by id: ${id} Successfully`);
    }
}
