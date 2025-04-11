import { TeamAchievementCreateDto, TeamAchievementDto } from "../Dtos/TeamAchievement";
import { TeamAchievementService } from "./TeamAchievement.service";

export interface ITeamsAchievementService {
    /**
     * Add Team Achievement
     * @param {string} teamId - The ID of the team
     * @param {Express.Multer.File} imageFile - The image of the achievement uploaded
     * @param {TeamAchievementCreateDto} data - The data (title and desc) of the achievement 
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<TeamAchievementDto>} returns the created achievement
     * @throws {NotFoundException} if achievement is not found or if user is not the community leader
     */
    Add(
        teamId: string, 
        imageFile:Express.Multer.File,
        data:TeamAchievementCreateDto, 
        leaderId: string): Promise<TeamAchievementDto>;


    /**
     * Delete Team Achievement
     * @param {string} teamId - The ID of the team
     * @param {string} achievementId - The ID of the achievement to delete
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} 
     * @throws {NotFoundException} if achievement is not found or if user is not the community leader
     */
    Delete(teamId: string, achievementId: string, leaderId: string): Promise<void>;

    
    /**
     * Return Achievement by id
     * @param {string} teamId - The ID of the team
     * @param {string} achievementId - The ID of the achievement to delete
     * @returns {Promise<TeamAchievementDto>} achievement
     * @throws {NotFoundException} if achievement is not found 
     */
    GetById(teamId: string, achievementId: string): Promise<TeamAchievementDto>;

    
    /**
     * Return all Achievements by team id
     * @param {string} teamId - The ID of the team
     * @returns {Promise<TeamAchievementDto[]>} all team achievement
     * @throws {NotFoundException} if team is not found 
     */
    GetByTeam(teamId: string): Promise<TeamAchievementDto[]>;
} 

export const ITeamsAchievementService = Symbol("ITeamsAchievementService")


export const ITeamsAchievementServiceProvider = {
    provide:ITeamsAchievementService,
    useClass:TeamAchievementService
}