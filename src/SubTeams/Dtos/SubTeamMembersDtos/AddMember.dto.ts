import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsEmail } from "class-validator"

export class AddMemberDto
{
    @ApiProperty()
    @IsEmail()
    public UserEmail:string

    @ApiProperty()
    @IsBoolean()
    public IsHead:boolean = false

    @ApiProperty()
    @IsDateString()
    public JoinDate:Date = new Date()
}