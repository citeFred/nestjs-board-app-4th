import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user/user-role.enum';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // 회원 가입 기능
    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<User> {
        this.logger.verbose(`Visitor is creating a new account with title: ${createUserRequestDto.email}`);

        const { username, password, email, role } = createUserRequestDto;
        if (!username || !password || !email || !role) {
            throw new BadRequestException('Something went wrong.');
        }

        await this.checkEmailExist(email);

        const hashedPassword = await this.hashPassword(password);

        const newUser = this.userRepository.create({
            username, 
            password: hashedPassword,
            email,
            role,
        });

        const createdUser = await this.userRepository.save(newUser);
        
        this.logger.verbose(`New account email with ${createdUser.email} created Successfully`);
        return createdUser;
    }

    // Email로 회원 조회 기능
    async findUserByEmail(email: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if(!existingUser) {
            throw new NotFoundException('User not found');
        }
        return existingUser;
    }

    async checkEmailExist(email: string): Promise<void> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if(existingUser) {
            throw new ConflictException('Email already exists');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}