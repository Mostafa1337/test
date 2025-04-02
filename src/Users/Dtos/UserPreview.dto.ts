import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UserPreviewDto {
    @ApiProperty({
        name: "FirstName",
        type: "string",
    })
    @AutoMap()
    FirstName: string

    @ApiProperty()
    @AutoMap()
    ProfilePhoto: string;

    constructor(FirstName: string, ProfilePhoto: string) {
        this.FirstName = FirstName
        this.ProfilePhoto = ProfilePhoto
    }
}