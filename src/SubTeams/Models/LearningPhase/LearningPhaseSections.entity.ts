import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { SubTeams } from "../SubTeams.entity";
import { LearningPhaseVideos } from "./LearningPhaseVideos.entity";
import { LearningPhaseResources } from "./LearningPhaseResources.entity";

export class LearningPhaseSections extends EntityBase
{
    @AutoMap()
    Name!:string

    @AutoMap()
    Number!:number

    @AutoMap()
    SubTeamId!:string

    @AutoMap(()=> SubTeams)
    SubTeam?:SubTeams

    @AutoMap(()=> LearningPhaseVideos)
    Videos?:LearningPhaseVideos[]
    
    @AutoMap(()=> LearningPhaseResources)
    Resources?:LearningPhaseResources[]
}