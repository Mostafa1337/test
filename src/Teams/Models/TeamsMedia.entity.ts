import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { Teams } from "./Teams.entity";

export class TeamsMedia extends EntityBase 
{
    @AutoMap()
    Name!:string

    @AutoMap()
    Link!:string

    @AutoMap()
    TeamId!:string

    @AutoMap(()=> Teams)
    Team?:Teams

    constructor(
        Name: string,
        Link: string,
        TeamId: string,
    ) {
        super();
        this.Name = Name
        this.Link = Link
        this.TeamId = TeamId
    }
}