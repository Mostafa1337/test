import { EntityBase } from "src/Common/EntityBase";
import { AutoMap } from "@automapper/classes";
import { Users } from "src/Users/Models/Users.entity";
import { CommunitiesImages } from "./CommunitiesImages.entity";
import { CommunitiesMedia } from "./CommunitiesMedia.entity";
import { CommunitiesConstants } from "../CommunitiesConstants";

export class Communities extends EntityBase {

    @AutoMap()
    Name!: string

    @AutoMap()
    Desc: string

    @AutoMap()
    DescShort: string

    @AutoMap()
    Vision: string

    @AutoMap()
    Logo: string = CommunitiesConstants.DefaultLogo

    @AutoMap()
    LeaderId!: string

    @AutoMap(() => Users)
    Leader?: Users

    @AutoMap(() => [CommunitiesImages])
    Images?: CommunitiesImages[]

    @AutoMap(() => [CommunitiesMedia])
    MediaLinks?: CommunitiesMedia[]
}