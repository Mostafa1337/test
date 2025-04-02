import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { Teams } from "./Teams.entity";
import { Users } from "src/Users/Models/Users.entity";

export class TeamLeaders extends EntityBase 
{
    @AutoMap()
    StartDate:Date = new Date()

    @AutoMap()
    EndDate?:Date

    @AutoMap()
    LeaderId!: string

    @AutoMap(() => Users)
    Leader?: Users

    @AutoMap()
    TeamId!:string

    @AutoMap(()=> Teams)
    Team?:Teams

    @AutoMap()
    get IsActive(): boolean {
        return this.EndDate ? false : true;
    }
    
    constructor(
        EndDate: Date,
        LeaderId: string,
        TeamId: string,
    ) {
        super()

        this.EndDate = EndDate
        this.LeaderId = LeaderId
        this.TeamId = TeamId
    }
}