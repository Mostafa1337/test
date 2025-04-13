import { Schema } from "src/Infrastructure/Database/Contracts/Schema";
import { GetKey } from "src/Common/GetKeyFrom";
import { Teams } from "../Teams.entity";
import { TeamAchievements } from "../TeamAchievements.entity";
import { TeamChannels } from "../TeamChannels.entity";
import { TeamChannelChats } from "../TeamChannelChats.entity";
import { Users } from "src/Users/Models/Users.entity";

export class TeamChannelChatsSchema extends Schema<TeamChannelChats> {
    constructor() {
        super({
            target: TeamChannelChats,
            name: TeamChannelChats.name,
            columns: {
                Text: {
                    type: "text",
                    nullable: false,
                },
                ChannelId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                },
                UserId:{
                    type: "varchar",
                    length: 32,
                    nullable: false,
                }
            },
            relations: {
                Channel: {
                    type: "many-to-one",
                    target: TeamChannels.name,
                    joinColumn: { name: GetKey<TeamChannelChats>("ChannelId"),referencedColumnName:GetKey<TeamChannels>("Id")}, 
                    onDelete: "CASCADE",
                },
                User: {
                    type: "many-to-one",
                    target: Users.name,
                    joinColumn: { name: GetKey<TeamChannelChats>("UserId"),referencedColumnName:GetKey<Users>("Id") }, 
                    onDelete: "RESTRICT",
                },
            },
        })
    }
}

export default new TeamChannelChatsSchema();
