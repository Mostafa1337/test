import { IsString } from "class-validator"

export class SubTeamSearchId 
{
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    constructor(CommunityId: string, teamId: string, SubTeamId: string) {
        this.communityId = CommunityId
        this.teamId = teamId
        this.subTeamId = SubTeamId
    }
}

export class SubTeamSearchIdWithImageId 
{
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    @IsString()
    public imageid: string
}

export class SubTeamSearchIdWithUserId 
{
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    @IsString()
    public memberId: string
}