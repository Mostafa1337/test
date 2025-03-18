import { AutoMap } from "@automapper/classes";
import { LogoDto } from "./Logo.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CommunityCardDto
{
    @AutoMap()
    @ApiProperty()
    Id:string
    
    @AutoMap(()=> LogoDto)
    @ApiProperty({type:[LogoDto]})
    Logo:LogoDto

    @AutoMap()
    @ApiProperty()
    Name:string

    @AutoMap()
    @ApiProperty()
    DescShort:string

    @ApiProperty()
    MembersCount:number = 0
}