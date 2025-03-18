import { AutoMap } from "@automapper/classes";
import { CommunitiesConstants } from "../CommunitiesConstants";
import { CommunitiesImagesDto } from "./CommunitiesImages.dto";
import { CommunityMediaCreateDto } from "./CommunityMediaCreatedto";
import { ApiProperty } from "@nestjs/swagger";

export class CommunityDto {

    @AutoMap()
    @ApiProperty()
    Id: string

    @AutoMap()
    @ApiProperty()
    Name: string

    @AutoMap()
    @ApiProperty()
    Desc: string

    @AutoMap()
    @ApiProperty()
    DescShort: string

    @AutoMap()
    @ApiProperty()
    Vision: string

    @AutoMap()
    @ApiProperty()
    Logo: string = CommunitiesConstants.DefaultLogo

    @AutoMap(() => [CommunitiesImagesDto])
    @ApiProperty({type:[CommunitiesImagesDto]})
    Images?: CommunitiesImagesDto[]

    @AutoMap(() => [CommunityMediaCreateDto])
    @ApiProperty({type:[CommunityMediaCreateDto]})
    MediaLinks?: CommunityMediaCreateDto[]

    @AutoMap()
    @ApiProperty()
    CreatedAt: Date
}