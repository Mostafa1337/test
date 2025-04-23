import { IsString } from "class-validator"

export class SubTeamSearchId {
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

export class SubTeamSearchIdWithImageId {
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    @IsString()
    public imageid: string
}

export class SubTeamSearchIdWithUserId {
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    @IsString()
    public memberId: string
}

export class SubTeamSearchIdWithSection {
    @IsString()
    public communityId: string

    @IsString()
    public teamId: string

    @IsString()
    public subTeamId: string

    @IsString()
    public sectionId: string
    
    constructor(
        communityId: string,
        teamId: string,
        subTeamId: string,
        sectionId: string
    ) {
        this.communityId = communityId
        this.teamId = teamId
        this.subTeamId = subTeamId
        this.sectionId = sectionId
    }
}