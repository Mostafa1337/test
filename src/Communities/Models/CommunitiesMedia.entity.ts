import { AutoMap } from "@automapper/classes";
import { EntityBase } from "src/Common/EntityBase";
import { Communities } from "./Communities.entity";

export class CommunitiesMedia extends EntityBase 
{
    @AutoMap()
    Name!:string

    @AutoMap()
    Link!:string

    @AutoMap()
    CommunityId!:string

    @AutoMap(()=> Communities)
    Community?:Communities

    constructor(
        Name: string,
        Link: string,
        CommunityId: string,
    ) {
        super();
        this.Name = Name
        this.Link = Link
        this.CommunityId = CommunityId
    }
}