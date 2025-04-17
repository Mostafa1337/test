export class SubTeamSearchId 
{
    public CommunityId: string

    public teamId: string

    public SubTeamId: string

    constructor(CommunityId: string, teamId: string, SubTeamId: string) {
        this.CommunityId = CommunityId
        this.teamId = teamId
        this.SubTeamId = SubTeamId
    }
}