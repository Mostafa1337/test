import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { LearningPhaseSections } from "./LearningPhaseSections.entity";
import { UserProgress } from "./UserProgress.entity";

export class LearningPhaseVideos extends EntityBase
{
    @AutoMap()
    Name!:string

    @AutoMap()
    File!:string

    @AutoMap()
    Desc?:string

    @AutoMap()
    Duration:number = 0

    @AutoMap()
    SectionId!:string

    @AutoMap(()=> LearningPhaseSections)
    Section?:LearningPhaseSections

    @AutoMap(()=> UserProgress)
    Progress?:UserProgress[]
}