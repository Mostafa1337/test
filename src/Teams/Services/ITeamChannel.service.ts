import { TeamService } from "./Team.service";
import { TeamChannelDto } from "../Dtos/TeamChannel";

export interface ITeamsChannelService {
    /**
     * Add Team Channel
     * @param {string} teamId - The ID of the team
     * @param {string} channelName - The name of channel to be created
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<TeamChannelDto>} the created channel
     * @throws {NotFoundException} if image is not found or if user is not the community leader
    */
    AddChannel(teamId: string, channelName: string, leaderId: string): Promise<TeamChannelDto>;


    /**
     * Delete Team Channel
     * @param {string} teamId - The ID of the team
     * @param {string} channelId - The ID of the channel to delete
     * @param {string} leaderId - The ID of the leader performing the deletion
     * @returns {Promise<void>} 
     * @throws {NotFoundException} if image is not found or if user is not the community leader
    */
    DeleteChannel(teamId: string, channelId: string, leaderId: string): Promise<void>;

    
    /**
     * Return all Achievments by team id
     * @param {string} teamId - The ID of the team
     * @returns {Promise<TeamChannelDto[]>} all team channel
     * @throws {NotFoundException} if team is not found 
     */
    GetByTeam(teamId: string): Promise<TeamChannelDto[]>;
} 

export const ITeamsChannelService = Symbol("ITeamsChannelService")


// export const ITeamsChannelServiceProvider = {
//     provide:ITeamsChannelService,
//     useClass:TeamService
// }