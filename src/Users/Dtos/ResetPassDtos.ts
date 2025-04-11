import { ApiProperty } from "@nestjs/swagger"
import { ChangePasswordDto } from "./ChangePassword.dto"
import { IsEmail, IsNotEmpty, IsNumber, Max, Min } from "class-validator"

export class ResetPassDto
{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    Email:string
}

export class ResetPassCodeDto extends ResetPassDto
{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    Code:number
}

export class ResetPassCodeReturnDto
{
    @ApiProperty()
    Token:string
}

export class ResetPassTokenDto extends ChangePasswordDto
{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    Email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    Token:string
}