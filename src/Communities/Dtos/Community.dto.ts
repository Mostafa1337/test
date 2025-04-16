import { AutoMap } from "@automapper/classes";
import { CommunitiesConstants } from "../CommunitiesConstants";
import { ApiProperty } from "@nestjs/swagger";
import { ImagesDto } from "src/Common/DTOs/Images.dto";
import { MediaCreateDto } from "src/Common/DTOs/MediaCreatedto";
import { TeamCardDto } from "src/Teams/Dtos/TeamCard.dto";
import { ICanModify } from "src/Common/Generic/Contracts/ICanModify";

export class CommunityDto
{

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

    @AutoMap(() => [ImagesDto])
    @ApiProperty({type:[ImagesDto]})
    Images?: ImagesDto[] = []

    @AutoMap(() => [MediaCreateDto])
    @ApiProperty({type:[MediaCreateDto]})
    MediaLinks?: MediaCreateDto[] = []

    @AutoMap(() => [TeamCardDto])
    @ApiProperty({type:[TeamCardDto]})
    Teams: TeamCardDto[] = []

    @AutoMap()
    @ApiProperty()
    CreatedAt: Date
}

export class CommunityWithCanModifyDto extends CommunityDto implements ICanModify
{
    @ApiProperty()
    CanModify: boolean;
}
