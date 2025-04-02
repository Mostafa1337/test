import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { TeamChannels } from "./TeamChannels.entity";
import { Users } from "src/Users/Models/Users.entity";

export class TeamChannelChats extends EntityBase 
{
    @AutoMap()
    Text!:string

    @AutoMap()
    UserId!: string

    @AutoMap(() => Users)
    User?: Users

    @AutoMap()
    ChannelId!:string

    @AutoMap(()=> TeamChannels)
    Channel?:TeamChannels
}