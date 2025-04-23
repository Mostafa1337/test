import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { LearningPhaseVideos } from "./LearningPhaseVideos.entity";
import { Users } from "src/Users/Models/Users.entity";

export class UserProgress extends EntityBase
{
    @AutoMap()
    UserId:string

    @AutoMap(()=> Users)
    User?:Users

    @AutoMap()
    VideoId:string

    @AutoMap(()=> LearningPhaseVideos)
    Video?:LearningPhaseVideos

    @AutoMap()
    IsCompleted:boolean

    @AutoMap()
    WatchDuration:number
}