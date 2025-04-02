import { TeamAchievmentCreateDto, TeamAchievmentDto } from "../Dtos/TeamAchievment";
import { TeamAchievmentService } from "./TeamAchievement.service";

export interface ITeamsAchievementService {
    /**
     * Add Team Achievement
     * @param {string} teamId - The ID of the team
     * @param {Express.Multer.File} imageFile - The image of the achievment uploaded
     * @param {TeamAchievmentCreateDto} data - The data (title and desc) of the achievment 
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<TeamAchievmentDto>} returns the created achievment
     * @throws {NotFoundException} if achievment is not found or if user is not the community leader
     */
    Add(
        teamId: string, 
        imageFile:Express.Multer.File,
        data:TeamAchievmentCreateDto, 
        leaderId: string): Promise<TeamAchievmentDto>;


    /**
     * Delete Team Achievement
     * @param {string} teamId - The ID of the team
     * @param {string} achievmentId - The ID of the achievment to delete
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} 
     * @throws {NotFoundException} if achievment is not found or if user is not the community leader
     */
    Delete(teamId: string, achievmentId: string, leaderId: string): Promise<void>;

    
    /**
     * Return Achievmenta by id
     * @param {string} teamId - The ID of the team
     * @param {string} achievmentId - The ID of the achievment to delete
     * @returns {Promise<TeamAchievmentDto>} achievment
     * @throws {NotFoundException} if achievment is not found 
     */
    GetById(teamId: string, achievmentId: string): Promise<TeamAchievmentDto>;

    
    /**
     * Return all Achievments by team id
     * @param {string} teamId - The ID of the team
     * @returns {Promise<TeamAchievmentDto[]>} all team achievment
     * @throws {NotFoundException} if team is not found 
     */
    GetByTeam(teamId: string): Promise<TeamAchievmentDto[]>;
} 

export const ITeamsAchievmentService = Symbol("ITeamsAchievmentService")


export const ITeamsAchievmentServiceProvider = {
    provide:ITeamsAchievmentService,
    useClass:TeamAchievmentService
}