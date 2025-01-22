import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

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
}