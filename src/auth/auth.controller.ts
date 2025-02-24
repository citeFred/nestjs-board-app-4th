import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { Response } from 'express';
import { ApiResponseDto } from 'src/common/api-response-dto/api-response.dto';
import { CreateUserRequestDto } from 'src/users/dto/create-user-request.dto';

@Controller('api/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    
    constructor(private authService: AuthService){}

    // Sign-Up
    @Post('/signup')
    async signUp(@Body() createUserRequestDto: CreateUserRequestDto): Promise<ApiResponseDto<void>> {
        this.logger.verbose(`Visitor is try to creating a new account with title: ${createUserRequestDto.email}`);

        await this.authService.signUp(createUserRequestDto)

        this.logger.verbose(`New account created Successfully`);
        return new ApiResponseDto(true, HttpStatus.CREATED, 'User created Successfully');
    }

    // Sign-In
    @Post('/signin')
    async signIn(@Body() signInRequestDto: SignInRequestDto, @Res() res:Response): Promise<void> {
        this.logger.verbose(`User with email: ${signInRequestDto.email} is try to signing in`);

        const accessToken = await this.authService.signIn(signInRequestDto);

        this.logger.verbose(`User with email: ${signInRequestDto.email} issued JWT ${accessToken}`);

        // [2] JWT를 헤더에 저장 후 ApiResponse를 바디에 담아서 전송
        res.setHeader('Authorization', accessToken);
        const response = new ApiResponseDto(true, HttpStatus.OK, 'User logged in successfully', { accessToken });

        res.send(response);
    }
}