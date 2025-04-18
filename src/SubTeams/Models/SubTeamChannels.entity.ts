import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { SubTeams } from "./SubTeams.entity";

export class SubTeamChannels extends EntityBase 
{
    @AutoMap()
    Name!:string

    @AutoMap()
    SubTeamId!:string

    @AutoMap(()=> SubTeams)
    SubTeam?:SubTeams
}