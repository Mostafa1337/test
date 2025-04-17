import { EntityBase } from "src/Common/EntityBase";
import { Usertypes } from "./Usertype";
import { AutoMap } from "@automapper/classes";
import { AfterLoad } from "typeorm";
import { Communities } from "src/Communities/Models/Communities.entity";
import { SubTeamMembers } from "src/SubTeams/Models/SubTeamMembers.entity";
import { Teams } from "src/Teams/Models/Teams.entity";

export class Users extends EntityBase {

    @AutoMap()
    FirstName!: string

    @AutoMap()
    LastName!: string

    @AutoMap()
    Email!: string

    @AutoMap()
    StudentId?: string

    @AutoMap()
    PhoneNumber!: string

    @AutoMap()
    Password!: string

    @AutoMap()
    Usertype: Usertypes = Usertypes.STUDENT

    @AutoMap()
    IsSuperAdmin: boolean = false

    @AutoMap()
    ProfilePhoto?: string

    @AutoMap()
    VerifyDate?:Date = null

    @AutoMap()
    CommunityLeaders?:Communities[] 

    @AutoMap()
    TeamActiveLeaders?:Teams[] 

    @AutoMap()
    SubTeams?:SubTeamMembers[] 
}