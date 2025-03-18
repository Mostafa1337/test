import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CommunitiesImagesDto 
{
    @AutoMap()
    @ApiProperty()
    Id:string

    @AutoMap()
    @ApiProperty()
    Name:string

    @AutoMap()
    @ApiProperty()
    Link:string
}