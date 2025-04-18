import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { SubTeams } from "./SubTeams.entity";

export class SubTeamsMedia extends EntityBase 
{
    @AutoMap()
    Name!:string

    @AutoMap()
    Link!:string

    @AutoMap()
    SubTeamId!:string

    @AutoMap(()=> SubTeams)
    SubTeam?:SubTeams

    constructor(
        Name: string,
        Link: string,
        SubTeamId: string,
    ) {
        super();
        this.Name = Name
        this.Link = Link
        this.SubTeamId = SubTeamId
    }
}