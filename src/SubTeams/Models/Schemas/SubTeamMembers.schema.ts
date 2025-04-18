import { Schema } from "src/Infrastructure/Database/Contracts/Schema";
import { GetKey } from "src/Common/GetKeyFrom";
import { SubTeams } from "../SubTeams.entity";
import { SubTeamChannels } from "../SubTeamChannels.entity";
import { SubTeamMembers } from "../SubTeamMembers.entity";
import { Users } from "src/Users/Models/Users.entity";

export class SubTeamMembersSchema extends Schema<SubTeamMembers> {
    constructor() {
        super({
            target: SubTeamMembers,
            name: SubTeamMembers.name,
            columns: {
                IsHead: {
                    type: "boolean",
                    nullable: false,
                    default:false
                },
                UserId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                },
                SubTeamId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                },
                JoinDate:{
                    type:"datetime",
                    nullable:true
                },
                LeaveDate:{
                    type:"datetime",
                    nullable:true
                },
            },
            indices:[
                {unique:true,columns:[GetKey<SubTeamMembers>("SubTeamId"),GetKey<SubTeamMembers>("UserId")]}
            ],
            relations: {
                SubTeam: {
                    type: "many-to-one",
                    target: SubTeams.name,
                    joinColumn: { name: GetKey<SubTeamMembers>("SubTeamId"),referencedColumnName:GetKey<SubTeams>("Id")}, 
                    inverseSide:GetKey<SubTeams>("Members"),
                    onDelete: "CASCADE",
                },
                User:{
                    type: "many-to-one",
                    target: Users.name,
                    joinColumn: { name: GetKey<SubTeamMembers>("UserId"),referencedColumnName:GetKey<Users>("Id")}, 
                    inverseSide:GetKey<Users>("SubTeams"),
                    onDelete: "CASCADE",  
                }
            },
        })
    }
}

export default new SubTeamMembersSchema();
