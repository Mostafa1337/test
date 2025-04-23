import { CreateVideoDto } from "src/SubTeams/Dtos/LearningPhase/CreateVideo.dto"
import { CreateResourceDto } from "src/SubTeams/Dtos/LearningPhase/CreateResource.dto"
import { LearningPhaseResourceDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseResourceDto.dto"
import { LearningPhaseSectionDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseSection.dto"
import { LearningPhaseVideoDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseVideo.dto"
import { SubTeamSearchId, SubTeamSearchIdWithSection } from "src/SubTeams/Dtos/SubTeamSearchId"
import { CreateSectionDto } from "src/SubTeams/Dtos/LearningPhase/CreateSection.dto"

export interface ILearningPhaseService
{
    //#region "Sections"
    AddSection(dto:CreateSectionDto,searchIds:SubTeamSearchId,leaderId:string) : Promise<LearningPhaseSectionDto>

    UpdateSection(dto:CreateSectionDto,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>

    DeleteSection(searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>
    //#endregion "Sections"

    //#region "Videos"
    UploadVideo(dto:CreateVideoDto,file:Express.Multer.File,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<LearningPhaseVideoDto>

    UpdateVideo(dto:CreateVideoDto,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>

    DeleteVideo(videoId:string,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>
    //#endregion "Videos"

    //#region "Resource" 
    UploadResource(dto:CreateResourceDto,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<LearningPhaseResourceDto>

    UpdateResource(dto:CreateResourceDto,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>

    DeleteResources(resourceId:string,searchIds:SubTeamSearchIdWithSection,leaderId:string) : Promise<void>
    //#endregion "Resource"
}