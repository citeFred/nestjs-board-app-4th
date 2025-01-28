import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // 회원 가입 기능
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const userResponseDto = new UserResponseDto(await this.authService.createUser(createUserDto))
        return userResponseDto;
    }

    // 로그인 기능
    @Post('/signin')
    async signIn(@Body() loginUserDto: LoginUserDto, @Res() res:Response): Promise<void> {
        const accessToken = await this.authService.signIn(loginUserDto);

        // [2] JWT를 쿠키에 저장
        res.cookie('Authorization', accessToken, {
            httpOnly: false,
            secure: false,
            maxAge: 360000,
            sameSite: 'lax'
        });
        
        res.send({message: "Login Success"});
    }

    @Post('/test')
    @UseGuards(AuthGuard('jwt')) // @UseGuards 는 해당 인증 가드가 적용되는, AuthGuard는 인증가드가 어떤 전략을 사용할지 결정
    testForAuth(@Req() req: Request) {
        console.log(req.user); // 인증된 사용자의 정보 출력
        return { message : 'Authenticated User', user: req.user};
    }

}
