import { Schema } from "src/Infrastructure/Database/Contracts/Schema";
import { GetKey } from "src/Common/GetKeyFrom";
import { Teams } from "../Teams.entity";
import { TeamLeaders } from "../TeamLeaders.entity";
import { Users } from "src/Users/Models/Users.entity";

export class TeamLeadersSchema extends Schema<TeamLeaders> {
    constructor() {
        super({
            target: TeamLeaders,
            name: TeamLeaders.name,
            columns: {
                EndDate: {
                    type: "date",
                    nullable: true,
                },
                StartDate:{
                    type: "date",
                    nullable: false,
                },
                TeamId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                },
                LeaderId: {
                    type: "varchar",
                    length: 32,
                    nullable: false,
                }
            },
            relations: {
                Team: {
                    type: "many-to-one",
                    target: Teams.name,
                    joinColumn: { name: GetKey<TeamLeaders>("TeamId"),referencedColumnName:GetKey<Teams>("Id")}, 
                    inverseSide:GetKey<Teams>("Leaders"),
                    onDelete: "CASCADE",
                },
                Leader: {
                    type: "many-to-one",
                    target: Users.name,
                    joinColumn: { name: GetKey<TeamLeaders>("LeaderId"),referencedColumnName:GetKey<Users>("Id") }, 
                    onDelete: "RESTRICT",
                },
            },
        })
    }
}

export default new TeamLeadersSchema();
