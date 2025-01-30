import { Body, Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './users.entity';

@Controller('api/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    
    constructor(private authService: AuthService){}

    // 회원 가입 기능
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        this.logger.verbose(`Visitor is try to creating a new account with title: ${createUserDto.email}`);

        const userResponseDto = new UserResponseDto(await this.authService.createUser(createUserDto))

        this.logger.verbose(`New account email with ${userResponseDto.email} created Successfully`);
        return userResponseDto;
    }

    // 로그인 기능
    @Post('/signin')
    async signIn(@Body() loginUserDto: LoginUserDto, @Res() res:Response): Promise<void> {
        this.logger.verbose(`User with email: ${loginUserDto.email} is try to signing in`);

        const accessToken = await this.authService.signIn(loginUserDto);

        // [2] JWT를 헤더에 저장
        res.setHeader('Authorization', accessToken);
        
        res.send({message: "Login Success", accessToken});
        this.logger.verbose(`User with email: ${loginUserDto.email} issued JWT ${accessToken}`);
    }
}
