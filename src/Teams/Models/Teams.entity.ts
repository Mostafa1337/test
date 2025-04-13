import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { TeamImages } from "./TeamImages.entity";
import { TeamsMedia } from "./TeamsMedia.entity";
import { TeamsConstants } from "../TeamsConstants";
import { Communities } from "src/Communities/Models/Communities.entity";
import { TeamAchievements } from "./TeamAchievements.entity";
import { Users } from "src/Users/Models/Users.entity";
import { TeamLeaders } from "./TeamLeaders.entity";
import { TeamChannels } from "./TeamChannels.entity";

export class Teams extends EntityBase {

    @AutoMap()
    Name!: string

    @AutoMap()
    Desc: string

    @AutoMap()
    DescShort: string

    @AutoMap()
    Vision: string

    @AutoMap()
    Logo: string = TeamsConstants.DefaultLogo

    @AutoMap()
    LeaderId!: string

    @AutoMap(() => Users)
    Leader?: Users

    @AutoMap()
    CommunityId!:string

    @AutoMap(()=> Communities)
    Community?: Communities

    @AutoMap(() => [TeamImages])
    Images?: TeamImages[]

    @AutoMap(() => [TeamsMedia])
    MediaLinks?: TeamsMedia[]

    @AutoMap(() => [TeamAchievements])
    Achievements?: TeamAchievements[]

    @AutoMap(() => [TeamLeaders])
    Leaders?: TeamLeaders[]

    @AutoMap(() => [TeamChannels])
    Channels?: TeamChannels[]
}