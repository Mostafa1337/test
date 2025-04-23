import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/Infrastructure/Database/Database.module";
import { SubTeams } from "./Models/SubTeams.entity";
import { SubTeamsMedia } from "./Models/SubTeamsMedia.entity";
import { SubTeamImages } from "./Models/SubTeamImages.entity";
import { SubTeamChannelChats } from "./Models/SubTeamChannelChats.entity";
import { SubTeamChannels } from "./Models/SubTeamChannels.entity";
import { ISubTeamsServiceProvider } from "./Services/SubTeams/ISubTeams.service";
import { UsersModule } from "src/Users/Users.module";
import { SubTeamMembers } from "./Models/SubTeamMembers.entity";
import { ISubTeamsMembersServiceProvider } from "./Services/Members/ISubTeamMembers.service";
import { SubTeamsController } from "./Controllers/SubTeams.controller";
import { TeamsModule } from "src/Teams/Teams.module";
import { SubTeamsProfile } from "./Controllers/SubTeams.profile";
import { SubTeamImagesGet } from "./Controllers/SubTeamImagesGet.controller";
import { SubTeamMembersController } from "./Controllers/SubTeamMembers.controller";
import { LearningPhaseResources } from "./Models/LearningPhase/LearningPhaseResources.entity";
import { LearningPhaseSections } from "./Models/LearningPhase/LearningPhaseSections.entity";
import { LearningPhaseVideos } from "./Models/LearningPhase/LearningPhaseVideos.entity";
import { UserProgress } from "./Models/LearningPhase/UserProgress.entity";

@Module({
    imports:[
       DatabaseModule.forFeature([SubTeams,SubTeamsMedia,SubTeamImages,SubTeamMembers,SubTeamChannelChats,SubTeamChannels,
        LearningPhaseSections,LearningPhaseResources,LearningPhaseVideos,UserProgress
       ]),
       UsersModule,TeamsModule
    ],
    controllers:[SubTeamsController, SubTeamImagesGet, SubTeamMembersController],
    providers:[ISubTeamsServiceProvider,ISubTeamsMembersServiceProvider,SubTeamsProfile],
})
export class SubTeamsModule{}