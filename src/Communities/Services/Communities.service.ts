import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, Scope, Inject, ConflictException, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { Communities } from "../Models/Communities.entity";
import { CommunityCreateDto } from "../Dtos/CommunityCreate.dto";
import { UsersService } from "src/Users/Services/Users.service";
import { Users } from "src/Users/Models/Users.entity";
import { CommunityCardDto } from "../Dtos/CommunityCard.dto";
import { CommunitiesImages } from "../Models/CommunitiesImages.entity";
import { CommunitiesMedia } from "../Models/CommunitiesMedia.entity";
import { Like, Raw } from "typeorm";
import { CommunitySearchDto } from "../Dtos/CommunitySearch.dto";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";
import { CommunityImageCreateDto } from "../Dtos/CommunityImageCreate.dto";
import { IFileService } from "src/Common/FileUpload/IFile.service";
import { CommunityLogoFileOptions } from "src/Common/FileUpload/FileTypes/CommunityLogo.file";
import { CommunitiesConstants } from "../CommunitiesConstants";
import { CommunityImagesFileOptions } from "src/Common/FileUpload/FileTypes/CommunityImages.file";
import { CommunitiesImagesDto } from "../Dtos/CommunitiesImages.dto";
import { CommunityDto } from "../Dtos/Community.dto";
import { CommunityUpdateDto } from "../Dtos/CommunityUpdate.dto";
import { ICommunitiesService } from "./ICommunities.service";

//TODO update the auth part to better approach
/**
 * Service handling all communities-related operations
 * @implements {ICommunitiesService}
 */
@Injectable({ scope: Scope.REQUEST })
export class CommunitiesService implements ICommunitiesService {

    constructor(
        @Inject("REPO_COMMUNITIES")
        private readonly repo: IGenericRepo<Communities>,
        @Inject("REPO_COMMUNITIESIMAGES")
        private readonly imagesRepo: IGenericRepo<CommunitiesImages>,
        @Inject("REPO_COMMUNITIESMEDIA")
        private readonly mediaRepo: IGenericRepo<CommunitiesMedia>,
        @Inject(IFileService)
        private readonly fileService: IFileService,
        @InjectMapper()
        private readonly mapper: Mapper,
        private readonly userService: UsersService,
    ) {
    }

    async Insert(dataToInsert: CommunityCreateDto): Promise<CommunityCardDto> {
        const user: Users = await this.userService.FindByEmail(dataToInsert.LeaderEmail)
        const communities: Communities[] = await this.repo.FindAll(
            [
                { Name: Raw(alias => `LOWER(${alias}) = LOWER(:name)`, { name: dataToInsert.Name.toLowerCase() }) },
                { LeaderId: user.Id }
            ]
        );
        for (const community of communities) {
            if (community.Name.toLowerCase() === dataToInsert.Name.toLowerCase()) {
                throw new ConflictException("There is a community with this name")
            } else if (community.LeaderId === user.Id) {
                throw new ConflictException("Leaders can only lead one community at maximum ")
            }
        }

        if (user.IsSuperAdmin) {
            throw new BadRequestException("Super admins can't be leaders for communitites ")
        }
        const community = new Communities();
        community.Name = dataToInsert.Name.trim()
        community.LeaderId = user.Id

        const addedCommunities: Communities = await this.repo.Insert(community);
        return await this.mapper.mapAsync(addedCommunities, Communities, CommunityCardDto)
    }

    async GetCards(dto: CommunitySearchDto): Promise<PaginationResponce<CommunityCardDto>> {
        const communitites = await this.repo.FindAllPaginated({ Name: Like(`%${dto?.Name}%`) }, {}, dto)
        return new PaginationResponce<CommunityCardDto>(
            await this.mapper.mapArrayAsync(communitites.Data, Communities, CommunityCardDto),
            communitites.Count
        )
    }

    async GetCommunity(id: string): Promise<CommunityDto> {
        const community = await this.repo.FindById(id,{
            MediaLinks: true,
            Images: true
        })

        if (!community)
            throw new NotFoundException("No Community found by id " + id)
        return await this.mapper.mapAsync(community,Communities,CommunityDto)
    }

    private async GetCommunityWithLeaderCheck(id: string,leaderId:string): Promise<CommunityDto> {
        const community = await this.repo.FindOne({
            Id:id,
            LeaderId:leaderId
        },{
            MediaLinks: true,
            Images: true
        })

        if (!community)
            throw new NotFoundException("No Community found by id " + id)
        return await this.mapper.mapAsync(community,Communities,CommunityDto)
    }

    async UpdateCommunities(id: string,dto:CommunityUpdateDto,leaderId:string):Promise<void> {
        const community = await this.GetCommunityWithLeaderCheck(id,leaderId);

        //TODO add Trnsaction here
        try{
            await this.mediaRepo.Repo.delete({CommunityId:community.Id})
            await this.mediaRepo.Repo.insert(dto.MediaLinks.map(x=> new CommunitiesMedia(x.Name,x.Link,community.Id)))

            delete dto.MediaLinks
            await this.repo.Repo.update(id,dto);
        }catch(err){
            throw new InternalServerErrorException(`Error happened when trying to update ${community.Name}`)
        }
    }

    async AddLogo(id: string, files: Express.Multer.File,leaderId:string) {
        const community = await this.GetCommunityWithLeaderCheck(id,leaderId);
        
        const fileUpload = await this.fileService.Update(
            files, CommunityLogoFileOptions,
            CommunitiesConstants.DefaultLogo === community.Logo ? null : community.Logo,
            true
        )

        community.Logo = `/communities/logo/${fileUpload.FileName}`
        await this.repo.Repo.update(id,{Logo:community.Logo});

        return community
    }

    async AddImage(id: string, files: Express.Multer.File[], dto: CommunityImageCreateDto,leaderId:string):Promise<CommunitiesImagesDto[]> 
    {
        const community = await this.GetCommunityWithLeaderCheck(id,leaderId);

        const communityImagesCount:number = await this.imagesRepo.Repo.countBy({CommunityId:id});
        if(communityImagesCount >= 10 || communityImagesCount + files.length > 10)
        {
            throw new BadRequestException("Maximum photos is 10")
        }
        
        return await Promise.all(
            files.map(async (x,i)=>{
                const fileUpload = await this.fileService.Upload([x], CommunityImagesFileOptions)

                const communityImage = new CommunitiesImages()
                communityImage.Name = dto.Name
                communityImage.File = `/communities/images/${fileUpload[0].FileName}`
                communityImage.CommunityId = community.Id
        
                const imageDb: CommunitiesImages = await this.imagesRepo.Insert(communityImage);
                return await this.mapper.mapAsync(imageDb, CommunitiesImages, CommunitiesImagesDto)
            })
        )
    }

    async DeleteImage(id:string,imageId: string,leaderId:string):Promise<void> {
        const community = await this.GetCommunityWithLeaderCheck(id,leaderId);

        const image = await this.imagesRepo.FindOne({
            CommunityId:id,
            Id:imageId
        })

        if(!image)
        {
            throw new NotFoundException("Image not found")
        }
        await this.fileService.Remove(image.File,CommunityImagesFileOptions,false)
        await this.imagesRepo.Delete(image.Id);
    }
}