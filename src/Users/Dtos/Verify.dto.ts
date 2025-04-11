import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class VerifyDto
{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Token:string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Email:string
}