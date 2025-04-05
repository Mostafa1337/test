import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class TeamAchievementCreateDto
{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    public Title:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(325)
    public Desc:string
    
}

export class TeamAchievementDto
{
    @AutoMap()
    @ApiProperty()
    Id: string

    @AutoMap()
    @ApiProperty()
    Title: string

    @AutoMap()
    @ApiProperty()
    Desc: string

    @AutoMap()
    @ApiProperty()
    ImageLink?:string    
}