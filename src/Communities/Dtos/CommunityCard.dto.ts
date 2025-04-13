import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CommunityCardDto
{
    @AutoMap()
    @ApiProperty()
    Id:string
    
    @AutoMap()
    @ApiProperty()
    Logo:string

    @AutoMap()
    @ApiProperty()
    Name:string

    @AutoMap()
    @ApiProperty()
    DescShort:string

    @ApiProperty()
    MembersCount:number = 0
}