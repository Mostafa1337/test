import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { SubTeamMembers } from "../Models/SubTeamMembers.entity";
import { ISubTeamsMembersService } from "./ISubTeamMembers.service";
import { ISubTeamsService } from "./ISubTeams.service";
import { BadRequestException, ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/Users/Services/Users.service";
import { SubTeams } from "../Models/SubTeams.entity";
import { Pagination } from "src/Common/Pagination/Pagination";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";
import { MemberReturnDto } from "../Dtos/SubTeamMembersDtos/MemberReturn.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

//TODO make rule for the verify if the member IsHead
/**
 * @implements {ISubTeamsMembersService}
 */
export class SubTeamsMembersService implements ISubTeamsMembersService {
    @Inject(ISubTeamsService)
    private readonly subTeamService: ISubTeamsService;

    @Inject(`REPO_${SubTeamMembers.name.toUpperCase()}`)
    private readonly membersRepo: IGenericRepo<SubTeamMembers>;

    private readonly userService: UsersService;

    @InjectMapper()
    private readonly mapper: Mapper;

    async AddMember(subTeamId: string, userId: string, isHead: boolean = false, joinDate: Date = null, leaderId: string): Promise<void> {
        const newMember = new SubTeamMembers();
        let subTeam: SubTeams
        if (!leaderId) {
            subTeam = await this.subTeamService.GetSubTeamById(subTeamId)
            newMember.IsHead = false;
            newMember.JoinDate = null;
        } else {
            subTeam = await this.subTeamService.VerifyLeaderId(subTeamId, leaderId)
            newMember.IsHead = isHead;
            newMember.JoinDate = joinDate;
        }
        const user = await this.userService.FindOne({ Id: userId }, true, { CommunityLeaders: true, TeamActiveLeaders: true })
        if (user.IsSuperAdmin) {
            throw new BadRequestException("Super admin can't join")
        }
        if (user.CommunityLeaders.length > 0) {
            throw new BadRequestException("Community leaders can't join")
        }
        if (user.TeamActiveLeaders.filter(x => x.LeaderId = userId).length > 0) {
            throw new BadRequestException(`Team leaders of this community can't join`)
        }

        const isExist = await this.membersRepo.FindOne({ SubTeamId: subTeamId, UserId: userId })
        if (isExist) {
            throw new ConflictException("This user already exist")
        }
        newMember.UserId = userId;
        newMember.SubTeamId = subTeamId
        await this.membersRepo.Insert(newMember)
    }

    async UpdateHead(subTeamId: string, userId: string, leaderId: string): Promise<void> {
        const subTeam = await this.subTeamService.VerifyLeaderId(subTeamId, leaderId)
        const member = await this.membersRepo.FindOne({ SubTeamId: subTeamId, UserId: userId })
        if (!member) {
            throw new NotFoundException("User not found")
        }

        if (!member.IsHead) {
            const user = await this.userService.FindOne({ Id: userId }, true, { CommunityLeaders: true, TeamActiveLeaders: true })
            if (user.IsSuperAdmin) {
                throw new BadRequestException("Super admin can't join")
            }
            if (user.CommunityLeaders.length > 0) {
                throw new BadRequestException("Community leaders can't join")
            }
            if (user.TeamActiveLeaders.filter(x => x.LeaderId = userId).length > 0) {
                throw new BadRequestException(`Team leaders of this community can't join`)
            }
        }
        member.IsHead = !member.IsHead
        await this.membersRepo.Update(member.Id, member)
    }

    async DeleteMember(subTeamId: string, userId: string, leaderId: string): Promise<void> {
        const subTeam = await this.subTeamService.VerifyLeaderId(subTeamId, leaderId)
        const member = await this.membersRepo.FindOne({ SubTeamId: subTeamId, UserId: userId });
        if (!member) {
            throw new NotFoundException(`This user is not in ${subTeam.Name} sub team`)
        }
        if (member.IsAccepted) {
            member.LeaveDate = new Date()
            await this.membersRepo.Update(member.Id, member)
        } else {
            await this.membersRepo.Delete(member.Id)
        }
    }

    async GetBySubTeam(subTeamId: string, leaderId: string, pagination: Pagination): Promise<PaginationResponce<MemberReturnDto>> {
        const subTeam = await this.subTeamService.VerifyLeaderId(subTeamId, leaderId)
        const data: PaginationResponce<SubTeamMembers> = await this.membersRepo.FindAllPaginated({ SubTeamId: subTeamId }, { User: true }, pagination)
        const dataDto: MemberReturnDto[] = await this.mapper.mapArrayAsync(data.Data, SubTeamMembers, MemberReturnDto);

        return new PaginationResponce<MemberReturnDto>(dataDto, data.Count);
    }

}