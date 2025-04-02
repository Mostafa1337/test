import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class TeamChannelCreateDto
{
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    Name: string
}

export class TeamChannelDto
{
    @AutoMap()
    @ApiProperty()
    Id: string

    @AutoMap()
    @ApiProperty()
    Name: string
}