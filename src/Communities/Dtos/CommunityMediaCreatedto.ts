import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, Max, MaxLength } from "class-validator";

export class CommunityMediaCreateDto 
{
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @AutoMap()
    @ApiProperty({
        name:"Name",
        maxLength:255,
    })
    Name:string

    @IsUrl({require_host:true})
    @MaxLength(255)
    @IsNotEmpty()
    @AutoMap()
    @ApiProperty({
        name:"Link",
        maxLength:255,
    })
    Link:string
}