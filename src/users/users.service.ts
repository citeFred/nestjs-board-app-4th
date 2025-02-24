import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // CREATE - User
    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<void> {
        const { username, password, email, role } = createUserRequestDto;

        const newUser = this.usersRepository.create({
            username,
            password,
            email,
            role,
        });

        await this.usersRepository.save(newUser);
    }

    // READ - by email
    async findUserByEmail(email: string): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if(!existingUser) {
            throw new NotFoundException('User not found');
        }
        return existingUser;
    }

    // Existing Checker
    async checkEmailExist(email: string): Promise<void> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if(existingUser) {
            throw new ConflictException('Email already exists');
        }
    }
}