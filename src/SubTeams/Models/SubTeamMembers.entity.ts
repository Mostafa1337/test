import { AutoMap } from "@automapper/classes"
import { SubTeams } from "./SubTeams.entity"
import { Users } from "src/Users/Models/Users.entity"
import { EntityBase } from "src/Common/EntityBase"

export class SubTeamMembers extends EntityBase
{
    @AutoMap()
    IsHead:boolean = false

    @AutoMap()
    JoinDate?:Date

    @AutoMap()
    LeaveDate?:Date

    @AutoMap()
    UserId!:string

    @AutoMap(()=> Users)
    User?:Users

    @AutoMap()
    SubTeamId!:string

    @AutoMap(()=> SubTeams)
    SubTeam?:SubTeams

    @AutoMap()
    get IsAccepted():boolean
    {
        return this.JoinDate ? true : false;
    }

    @AutoMap()
    get IsLeft():boolean
    {
        return this.LeaveDate ? true : false;
    }
}