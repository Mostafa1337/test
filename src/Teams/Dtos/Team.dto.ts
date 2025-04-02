import { AutoMap } from "@automapper/classes";
import { TeamsConstants } from "../TeamsConstants";
import { ImagesDto } from "../../Common/DTOs/Images.dto";
import { MediaCreateDto } from "../../Common/DTOs/MediaCreatedto";
import { ApiProperty } from "@nestjs/swagger";
import { TeamChannelDto } from "./TeamChannel";
import { TeamAchievmentDto } from "./TeamAchievment";
import { TeamLeaderDto } from "./TeamLeader";

export class TeamDto {

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
    Logo: string = TeamsConstants.DefaultLogo

    @AutoMap(() => [ImagesDto])
    @ApiProperty({type:[ImagesDto]})
    Images: ImagesDto[] = []

    @AutoMap(() => [MediaCreateDto])
    @ApiProperty({type:[MediaCreateDto]})
    MediaLinks: MediaCreateDto[] = []

    @AutoMap(() => [TeamChannelDto])
    @ApiProperty({type:[TeamChannelDto]})
    Channels: TeamChannelDto[] = []

    @AutoMap(() => [TeamAchievmentDto])
    @ApiProperty({type:[TeamAchievmentDto]})
    Achievements: TeamAchievmentDto[] = []

    @AutoMap(() => [TeamLeaderDto])
    @ApiProperty({type:[TeamLeaderDto]})
    Leaders: TeamLeaderDto[] = []

    @AutoMap()
    @ApiProperty()
    CreatedAt: Date
}