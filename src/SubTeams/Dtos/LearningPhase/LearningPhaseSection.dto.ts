import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { LearningPhaseResources } from "src/SubTeams/Models/LearningPhase/LearningPhaseResources.entity";
import { LearningPhaseVideos } from "src/SubTeams/Models/LearningPhase/LearningPhaseVideos.entity";

export class LearningPhaseSectionDto
{
    @AutoMap()
    @ApiProperty()
    Id:string

    @AutoMap()
    @ApiProperty()
    Name:string

    @AutoMap()
    @ApiProperty()
    Number:number

    @ApiProperty()
    Videos:LearningPhaseVideos[] = []
    
    @ApiProperty()
    Resources:LearningPhaseResources[] = []
}