import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, MaxLength, IsNotEmpty, Matches, IsUrl, IsOptional } from "class-validator";

export class SubTeamCreateDto 
{
    @IsString()
    @MaxLength(15,{message:"Name maximum length is 15"})
    @IsNotEmpty({message:"Name must be not empty"})
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: 'Name must contain only letters and numbers (no spaces or special characters).',
    })
    @ApiProperty({
        name:"Name",
        maxLength:15,
        type:"string",
        nullable:false,
        required:true,
        description:"Regex: /^[a-zA-Z0-9]+$/",
        pattern:"/^[a-zA-Z0-9]+$/"
    })
    Name:string;

    @MaxLength(500,{message:"Join Link maximum length is 500"})
    @IsUrl()
    @IsOptional()
    @Transform(({ value }) => value === '' ? null : value)
    @ApiProperty({
        name:"JoinLink",
        maxLength:500,
        type:"string",
        nullable:true,
        required:false,
        description:"Can be null or url",
    })
    JoinLink?:string = null;
}