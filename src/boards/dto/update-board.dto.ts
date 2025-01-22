import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBoardDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    contents: string;
}