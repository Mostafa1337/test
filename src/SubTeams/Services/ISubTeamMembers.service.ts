import { Pagination } from "src/Common/Pagination/Pagination";
import { SubTeamsMembersService } from "./SubTeamsMembers.service";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";
import { MemberReturnDto } from "../Dtos/SubTeamMembersDtos/MemberReturn.dto";

export interface ISubTeamsMembersService {
    /**
     * Add Member
     * @param {string} subTeamId - The ID of the sub team
     * @param {string} userId - The user want to join
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} the created member
     * @throws {NotFoundException} if sub team  is not found or if leaderId is not the community/team leader
     * @throws {ConflictException} if the user already in the sub team 
     * @throws {BadRequestException} if IsHead and true and the user is already Community/Team/SubTeam leader
    */
    AddMember(subTeamId: string, userId: string,isHead:boolean,joinDate:Date,leaderId:string): Promise<void>;

    /**
     * Reverse the IsHead status of the member 
     * @param {string} subTeamId - The ID of the sub team
     * @param {string} userId - The user Id
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} 
     * @throws {NotFoundException} if member not found or if leaderId is not the community/team leader
     * @throws {BadRequestException} if the new IsHead is true and the user is already Community/Team/SubTeam leader
    */
    UpdateHead(subTeamId: string, userId: string,leaderId:string):Promise<void>;


    /**
     * Delete Team Channel
     * @param {string} subTeamId - The ID of the sub team
     * @param {string} userId - The user Id
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} 
     * @throws {NotFoundException} if user is not found or if leaderId is not the community/team leader
    */
    DeleteMember(subTeamId: string, userId: string, leaderId: string): Promise<void>;

    
    /**
     * Return all Achievements by team id
     * @param {string} subTeamId - The ID of the team
     * @param {string} leaderId - The ID of the leader trying to the users
     * @param {Pagination} pagination - Users in the sub team paginated
     * @returns {Promise<void>} all sub team members
     * @throws {NotFoundException} if sub team is not found 
     */
    GetBySubTeam(subTeamId: string, leaderId: string,pagination:Pagination): Promise<PaginationResponce<MemberReturnDto>>;
} 

export const ISubTeamsMembersService = Symbol("ISubTeamsMembersService")


export const ISubTeamsMembersServiceProvider = {
    provide:ISubTeamsMembersService,
    useClass:SubTeamsMembersService
}