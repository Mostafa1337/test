import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { SubTeamChannels } from "./SubTeamChannels.entity";
import { Users } from "src/Users/Models/Users.entity";

export class SubTeamChannelChats extends EntityBase 
{
    @AutoMap()
    Text!:string

    @AutoMap()
    UserId!: string

    @AutoMap(() => Users)
    User?: Users

    @AutoMap()
    ChannelId!:string

    @AutoMap(()=> SubTeamChannels)
    Channel?:SubTeamChannels
}