import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { Teams } from "./Teams.entity";

export class TeamImages extends EntityBase 
{

    @AutoMap()
    Name?:string

    @AutoMap()
    File!:string

    @AutoMap()
    TeamId!:string

    @AutoMap(()=> Teams)
    Team?:Teams
}