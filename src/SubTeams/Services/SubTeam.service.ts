import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { IFileService } from "src/Common/FileUpload/IFile.service";
import { SubTeams } from "../Models/SubTeams.entity";
import { Injectable, Scope, Inject, ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { ISubTeamsService } from "./ISubTeams.service";
import { SubTeamImages } from "../Models/SubTeamImages.entity";
import { SubTeamsMedia } from "../Models/SubTeamsMedia.entity";
import { UsersService } from "src/Users/Services/Users.service";
import { ImageCreateDto } from "src/Common/DTOs/ImageCreate.dto";
import { ImagesDto } from "src/Common/DTOs/Images.dto";
import { LogoDto } from "src/Common/DTOs/Logo.dto";
import { SubTeamDto } from "../Dtos/SubTeam.dto";
import { SubTeamCardDto } from "../Dtos/SubTeamCard.dto";
import { SubTeamCreateDto } from "../Dtos/SubTeamCreate.dto";
import { SubTeamSearchId } from "../Dtos/SubTeamSearchId";
import { SubTeamUpdateDto } from "../Dtos/SubTeamUpdate.dto";
import { ITeamsService } from "src/Teams/Services/ITeams.service";
import { IsNull, Not, Raw } from "typeorm";
import { ICommunitiesService } from "src/Communities/Services/ICommunities.service";
import { SubTeamsConstants } from "../SubTeamsConstants";
import { SubTeamLogoFileOptions } from "src/Common/FileUpload/FileTypes/SubTeamLogo.file";
import { SubTeamImagesFileOptions } from "src/Common/FileUpload/FileTypes/SubTeamImages.file";


/**
 * @implements {ISubTeamsService}
 */
@Injectable({ scope: Scope.REQUEST })
export class SubTeamService implements ISubTeamsService {

    constructor(
        @Inject(`REPO_${SubTeams.name.toUpperCase()}`)
        private readonly repo: IGenericRepo<SubTeams>,

        @Inject(`REPO_${SubTeamImages.name.toUpperCase()}`)
        private readonly imagesRepo: IGenericRepo<SubTeamImages>,

        @Inject(`REPO_${SubTeamsMedia.name.toUpperCase()}`)
        private readonly mediaRepo: IGenericRepo<SubTeamsMedia>,

        @Inject(IFileService)
        private readonly fileService: IFileService,
        private readonly userService: UsersService,
        @InjectMapper()
        private readonly mapper: Mapper,

        @Inject(ITeamsService)
        private readonly teamService: ITeamsService,
    ) {
    }

    async Insert(dataToInsert: SubTeamCreateDto, teamId: string, leaderId: string): Promise<SubTeamCardDto> {
        const team = await this.teamService.VerifyLeaderId(teamId, leaderId)
        const subTeams: SubTeams[] = await this.repo.FindAll(
            { Name: Raw(alias => `LOWER(${alias}) = LOWER(:name)`, { name: dataToInsert.Name.toLowerCase() }), TeamId: teamId },
        );

        if (subTeams.length > 0) {
            throw new ConflictException(`Sub team ${dataToInsert.Name} already exist`)
        }
        const newSubTeam: SubTeams = new SubTeams()
        newSubTeam.Name = newSubTeam.Name
        newSubTeam.TeamId = team.Id
        newSubTeam.CommunityId = team.CommunityId

        await this.repo.Insert(newSubTeam);

        return await this.mapper.mapAsync(newSubTeam, SubTeams, SubTeamCardDto)
    }

    async GetSubTeam(dto: SubTeamSearchId): Promise<SubTeamDto> {
        const subTeam = await this.repo.FindOne(
            { CommunityId: dto.CommunityId, TeamId: dto.teamId, Id: dto.teamId },
            { Images: true, MediaLinks: true, Channels: true }
        )

        if (subTeam === null) {
            throw new NotFoundException("Sub team Not Found")
        }

        return await this.mapper.mapAsync(subTeam, SubTeams, SubTeamDto)
    }

    async GetSubTeamById(id: string): Promise<SubTeams> {
        const subTeam = await this.repo.FindOne(
            { Id: id },
            { Images: true, MediaLinks: true, Channels: true }
        )

        if (subTeam === null) {
            throw new NotFoundException("Sub team Not Found")
        }

        return subTeam
    }

    async GetSubTeams(communityId: string, teamId: string): Promise<SubTeamCardDto[]> {
        const team = await this.teamService.GetTeam(teamId, communityId);

        const subTeams: SubTeams[] = await this.repo.FindAll({ CommunityId: communityId, TeamId: team.Id })

        return await this.mapper.mapArrayAsync(subTeams, SubTeams, SubTeamCardDto)
    }

    async UpdateTeam(searchDto: SubTeamSearchId, dto: SubTeamUpdateDto, leaderId: string): Promise<void> {
        const subTeam: SubTeams = await this.VerifyLeaderId(searchDto.SubTeamId, leaderId);
        subTeam.Desc = dto.Desc
        subTeam.DescShort = dto.DescShort
        subTeam.Vision = dto.Vision

        try {
            //TODO add Transaction
            await this.mediaRepo.Repo.delete({ SubTeamId: subTeam.Id });
            await this.mediaRepo.Repo.insert(dto.MediaLinks.map(x => new SubTeamsMedia(x.Name, x.Link, subTeam.Id)))
            await this.repo.Update(subTeam.Id, subTeam);
        } catch (err) {
            throw new InternalServerErrorException(`Error happened when trying to update team ${subTeam.Name}`)
        }
    }

    async UpdateCore(searchDto: SubTeamSearchId, dto: SubTeamCreateDto, leaderId: string): Promise<void> {
        const subTeam = await this.repo.FindOne([
            { CommunityId: searchDto.CommunityId, Community: { LeaderId: leaderId }, TeamId: searchDto.teamId, Id: searchDto.SubTeamId },
            { CommunityId: searchDto.CommunityId, Team: { LeaderId: leaderId }, TeamId: searchDto.teamId, Id: searchDto.SubTeamId }
        ], { Team: true, Community: true })

        const subTeamsWithSameName: SubTeams[] = await this.repo.FindAll(
            {
                Name: Raw(alias => `LOWER(${alias}) = LOWER(:name)`, { name: dto.Name.toLowerCase() }),
                TeamId: subTeam.TeamId, Id: Not(subTeam.Id)
            },
        );
        if (subTeamsWithSameName.length > 0) {
            throw new ConflictException(`Sub team ${dto.Name} already exist`)
        }
        subTeam.Name = dto.Name
        await this.repo.Update(subTeam.Id, subTeam);
    }

    async AddLogo(searchDto: SubTeamSearchId, files: Express.Multer.File, leaderId: string): Promise<LogoDto> {
        const subTeam = await this.VerifyLeaderId(searchDto.SubTeamId, leaderId);

        const fileUpload = await this.fileService.Update(
            files, SubTeamLogoFileOptions,
            SubTeamsConstants.DefaultLogo === subTeam.Logo ? null : subTeam.Logo,
            true
        )

        subTeam.Logo = `/subTeams/logo/${fileUpload.FileName}`
        await this.repo.Repo.update(subTeam.Id, subTeam);

        return new LogoDto(`Sub team ${subTeam.Name} Logo`, subTeam.Logo)
    }

    async AddImages(searchDto: SubTeamSearchId, files: Express.Multer.File[], dto: ImageCreateDto, leaderId: string): Promise<ImagesDto[]> {
        const subTeams = await this.VerifyLeaderId(searchDto.SubTeamId, leaderId);

        const subTeamImagesCount: number = await this.imagesRepo.Repo.countBy({ SubTeamId: subTeams.Id });
        if (subTeamImagesCount >= 10 || subTeamImagesCount + files.length > 10) {
            throw new BadRequestException("Maximum photos is 10")
        }

        return await Promise.all(
            files.map(async (x, i) => {
                const fileUpload = await this.fileService.Upload([x], SubTeamImagesFileOptions)

                const communityImage = new SubTeamImages()
                communityImage.Name = dto.Name
                communityImage.File = `/subTeams/images/${fileUpload[0].FileName}`
                communityImage.SubTeamId = subTeams.Id

                const imageDb: SubTeamImages = await this.imagesRepo.Insert(communityImage);
                return await this.mapper.mapAsync(imageDb, SubTeamImages, ImagesDto)
            })
        );
    }

    async DeleteImage(subTeamId: string, imageId: string, leaderId: string): Promise<void> {
        const subTeam = await this.VerifyLeaderId(subTeamId, leaderId);

        const image = await this.imagesRepo.FindOne({
            SubTeamId: subTeam.Id,
            Id: imageId
        })

        if (!image) {
            throw new NotFoundException("Image not found")
        }

        //TODO add Transaction
        await this.imagesRepo.Delete(image.Id);
        await this.fileService.Remove(image.File, SubTeamImagesFileOptions, false)    
    }

    async VerifyLeaderId(Id: string, userId: string): Promise<SubTeams> {
        const subTeam: SubTeams = await this.repo.FindOne(
            { Id: Id, Members: { IsHead: true,LeaveDate:IsNull() } },
            { Community: true, Team: true, Members: true })
        if (subTeam === null) {
            throw new NotFoundException("Team Not Found")
        }

        const isHeadExist: boolean = subTeam.Members.filter(x => x.UserId === userId).length > 0;
        if (subTeam.Team.LeaderId !== userId && subTeam.Community.LeaderId !== userId && !isHeadExist) {
            throw new NotFoundException("Team Not Found")
        }

        return subTeam;
    }

}