import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { SubTeams } from "./SubTeams.entity";

export class SubTeamImages extends EntityBase 
{

    @AutoMap()
    Name?:string

    @AutoMap()
    File!:string

    @AutoMap()
    SubTeamId!:string

    @AutoMap(()=> SubTeams)
    SubTeam?:SubTeams
}