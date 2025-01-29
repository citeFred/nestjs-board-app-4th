import { IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    contents: string;
}