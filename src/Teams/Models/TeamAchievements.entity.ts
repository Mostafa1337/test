import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { Teams } from "./Teams.entity";

export class TeamAchievements extends EntityBase {

    @AutoMap()
    Title!: string

    @AutoMap()
    Desc: string

    @AutoMap()
    ImageLink?: string

    @AutoMap()
    TeamId!: string

    @AutoMap(() => Teams)
    Team?: Teams

    constructor(
        Title: string,
        Desc: string,
        ImageLink: string,
        TeamId: string,
    ) {
        super()

        this.Title = Title
        this.Desc = Desc
        this.ImageLink = ImageLink
        this.TeamId = TeamId
    }
}