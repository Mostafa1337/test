import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, ValidateNested, IsArray } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { CommunityMediaCreateDto } from "./CommunityMediaCreatedto";

export class CommunityUpdateDto 
{
    @IsString()
    @MaxLength(325,{message:"Vision maximum length is 325"})
    @IsNotEmpty({message:"Vision must be not empty"})
    @ApiProperty({
        name:"Vision",
        maxLength:325,
        type:"string",
        nullable:false,
        required:true
    })
    @AutoMap()
    Vision:string

    @IsString()
    @MaxLength(80,{message:"DescShort maximum length is 80"})
    @IsNotEmpty({message:"DescShort must be not empty"})
    @ApiProperty({
        name:"DescShort",
        maxLength:80,
        type:"string",
        nullable:false,
        required:true
    })
    @AutoMap()
    DescShort:string

    @IsString()
    @MaxLength(325,{message:"Desc maximum length is 325"})
    @IsNotEmpty({message:"Desc must be not empty"})
    @ApiProperty({
        name:"Desc",
        maxLength:325,
        type:"string",
        nullable:false,
        required:true
    })
    @AutoMap()
    Desc:string

    //TODO fix this validation
    @Type(() => CommunityMediaCreateDto)
    @IsArray()
    //@ValidateNested({ each: true })
    @ApiProperty({
        name:"MediaLinks",
        maxLength:325,
        type:[CommunityMediaCreateDto],
    })
    MediaLinks:CommunityMediaCreateDto[] = []
}