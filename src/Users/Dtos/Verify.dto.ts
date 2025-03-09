import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class VerifyDto
{
    @IsString()
    @IsNotEmpty()
    Token:string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    Email:string
}