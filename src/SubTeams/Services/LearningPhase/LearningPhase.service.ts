import { CreateVideoDto } from "src/SubTeams/Dtos/LearningPhase/CreateVideo.dto";
import { CreateResourceDto } from "src/SubTeams/Dtos/LearningPhase/CreateResource.dto";
import { LearningPhaseResourceDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseResourceDto.dto";
import { LearningPhaseSectionDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseSection.dto";
import { LearningPhaseVideoDto } from "src/SubTeams/Dtos/LearningPhase/LearningPhaseVideo.dto";
import { SubTeamSearchId, SubTeamSearchIdWithSection } from "src/SubTeams/Dtos/SubTeamSearchId";
import { ILearningPhaseService } from "./ILearningPhase.service";
import { ISubTeamsService } from "../SubTeams/ISubTeams.service";
import { GenericRepo } from "src/Infrastructure/Database/Repos/GenericRepo";
import { LearningPhaseSections } from "src/SubTeams/Models/LearningPhase/LearningPhaseSections.entity";
import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { CreateSectionDto } from "src/SubTeams/Dtos/LearningPhase/CreateSection.dto";
import { IFileService } from "src/Common/FileUpload/IFile.service";

export class LearningPhaseService implements ILearningPhaseService
{
    @Inject(ISubTeamsService)
    private readonly subTeamService:ISubTeamsService

    @Inject(`REPO_${LearningPhaseSections.name.toUpperCase()}`)
    private readonly sectionRepo:GenericRepo<LearningPhaseSections>;

    @Inject(IFileService)
    private readonly fileService:IFileService;

    async AddSection(dto:CreateSectionDto, searchIds: SubTeamSearchId, leaderId: string): Promise<LearningPhaseSectionDto> {
        const subTeam = await this.subTeamService.VerifyLeaderId(searchIds.subTeamId,leaderId);
        const newSection = new LearningPhaseSections();
        newSection.Name = dto.Name;
        if(!dto.Number || dto.Number === 0)
        {
            const sectionCount:number = await this.sectionRepo.Repo.countBy({SubTeamId:subTeam.Id});
            newSection.Number = sectionCount + 1;
        }
        else
        {
            const sectionWithSameNumber = await this.sectionRepo.FindOne({Number:newSection.Number,SubTeamId:subTeam.Id});
            if(sectionWithSameNumber)
            {
                throw new ConflictException(`Section ${sectionWithSameNumber.Name} already has the number ${sectionWithSameNumber.Number}`);
            }
            newSection.Number = dto.Number;
        }

        await this.sectionRepo.Insert(newSection);
        const returnDto = new LearningPhaseSectionDto();
        returnDto.Id = newSection.Id
        returnDto.Name = newSection.Name
        returnDto.Number = newSection.Number

        return returnDto;
    }

    async UpdateSection(dto:CreateSectionDto, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        const subTeam = await this.subTeamService.VerifyLeaderId(searchIds.subTeamId,leaderId);
        const section = await this.sectionRepo.FindOne({Id:searchIds.sectionId,SubTeamId:subTeam.Id});
        if(!section)
        {
            throw new NotFoundException("There is no section with this id")
        }
        section.Name = dto.Name;
        if(dto.Number && dto.Number > 0 && dto.Number !== section.Number)
        {
            const sectionWithSameNumber = await this.sectionRepo.FindOne({Number:section.Number,SubTeamId:subTeam.Id});
            if(sectionWithSameNumber)
            {
                throw new ConflictException(`Section ${sectionWithSameNumber.Name} already has the number ${sectionWithSameNumber.Number}`);
            }
            section.Number = dto.Number;
        }

        await this.sectionRepo.Update(section.Id,section);
    }
    
    DeleteSection(searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    UploadVideo(dto: CreateVideoDto, file: Express.Multer.File, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<LearningPhaseVideoDto> {
        throw new Error("Method not implemented.");
    }

    UpdateVideo(dto: CreateVideoDto, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    DeleteVideo(videoId: string, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    UploadResource(dto: CreateResourceDto, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<LearningPhaseResourceDto> {
        throw new Error("Method not implemented.");
    }

    UpdateResource(dto: CreateResourceDto, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    DeleteResources(resourceId: string, searchIds: SubTeamSearchIdWithSection, leaderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}