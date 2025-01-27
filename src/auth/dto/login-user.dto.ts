import { IsNotEmpty, MaxLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @MaxLength(30)
    password: string;
}