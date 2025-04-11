import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { Communities } from "./Communities.entity";

export class CommunitiesImages extends EntityBase 
{

    @AutoMap()
    Name?:string

    @AutoMap()
    File!:string

    @AutoMap()
    CommunityId!:string

    @AutoMap(()=> Communities)
    Community?:Communities
}