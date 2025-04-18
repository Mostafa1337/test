import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, Matches } from "class-validator";

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
}