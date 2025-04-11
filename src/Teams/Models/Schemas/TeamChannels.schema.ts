import { Schema } from "src/Infrastructure/Database/Contracts/Schema";
import { GetKey } from "src/Common/GetKeyFrom";
import { Teams } from "../Teams.entity";
import { TeamChannels } from "../TeamChannels.entity";

export class TeamChannelsSchema extends Schema<TeamChannels> {
    constructor() {
        super({
            target: TeamChannels,
            name: TeamChannels.name,
            columns: {
                Name: {
                    type: "varchar",
                    length: 50,
                    nullable: false,
                },
                TeamId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                }
            },
            relations: {
                Team: {
                    type: "many-to-one",
                    target: Teams.name,
                    joinColumn: { name: GetKey<TeamChannels>("TeamId"),referencedColumnName:GetKey<Teams>("Id")}, 
                    inverseSide:GetKey<Teams>("Channels"),
                    onDelete: "CASCADE",
                },
            },
        })
    }
}

export default new TeamChannelsSchema();
