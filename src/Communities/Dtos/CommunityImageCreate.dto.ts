import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, Max, MaxLength } from "class-validator";

export class CommunityImageCreateDto 
{
    @IsString()
    @MaxLength(255)
    @IsOptional()
    @ApiProperty({required:false,default:"Background image"})
    Name:string = "Background image"
}