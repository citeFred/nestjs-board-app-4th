import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // READ - by email
    async findUserByEmail(email: string): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if(!existingUser) {
            throw new NotFoundException('User not found');
        }
        return existingUser;
    }
}