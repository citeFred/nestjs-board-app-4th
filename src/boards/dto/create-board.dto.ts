import { IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    contents: string;

    // @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password too weak', }) // 대문자, 소문자, 숫자, 특수문자 포함
    // password: string;
}