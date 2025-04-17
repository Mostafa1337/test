import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/Infrastructure/Database/Database.module";
import { SubTeams } from "./Models/SubTeams.entity";
import { SubTeamsMedia } from "./Models/SubTeamsMedia.entity";
import { SubTeamImages } from "./Models/SubTeamImages.entity";
import { SubTeamChannelChats } from "./Models/SubTeamChannelChats.entity";
import { SubTeamChannels } from "./Models/SubTeamChannels.entity";
import { ISubTeamsServiceProvider } from "./Services/ISubTeams.service";
import { UsersModule } from "src/Users/Users.module";
import { SubTeamsProfile } from "./Controllers/SubTeams.profile";
import { SubTeamMembers } from "./Models/SubTeamMembers.entity";
import { ISubTeamsMembersServiceProvider } from "./Services/ISubTeamMembers.service";

@Module({
    imports:[
       DatabaseModule.forFeature([SubTeams,SubTeamsMedia,SubTeamImages,SubTeamMembers,SubTeamChannelChats,SubTeamChannels]),
       UsersModule
    ],
    // controllers:[TeamsController,TeamAchievementController,TeamImagesGet],
    providers:[ISubTeamsServiceProvider,ISubTeamsMembersServiceProvider,SubTeamsProfile],
})
export class SubTeamsModule{}