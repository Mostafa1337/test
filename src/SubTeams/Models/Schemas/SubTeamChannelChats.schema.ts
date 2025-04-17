import { Schema } from "src/Infrastructure/Database/Contracts/Schema";
import { GetKey } from "src/Common/GetKeyFrom";
import { SubTeamChannels } from "../SubTeamChannels.entity";
import { SubTeamChannelChats } from "../SubTeamChannelChats.entity";
import { Users } from "src/Users/Models/Users.entity";

export class SubTeamChannelChatsSchema extends Schema<SubTeamChannelChats> {
    constructor() {
        super({
            target: SubTeamChannelChats,
            name: SubTeamChannelChats.name,
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
                    target: SubTeamChannels.name,
                    joinColumn: { name: GetKey<SubTeamChannelChats>("ChannelId"),referencedColumnName:GetKey<SubTeamChannels>("Id")}, 
                    onDelete: "CASCADE",
                },
                User: {
                    type: "many-to-one",
                    target: Users.name,
                    joinColumn: { name: GetKey<SubTeamChannelChats>("UserId"),referencedColumnName:GetKey<Users>("Id") }, 
                    onDelete: "RESTRICT",
                },
            },
        })
    }
}

export default new SubTeamChannelChatsSchema();
