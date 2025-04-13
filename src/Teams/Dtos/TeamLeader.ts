import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserPreviewDto } from "src/Users/Dtos/UserPreview.dto";

export class TeamLeaderDto extends UserPreviewDto {
    @AutoMap()
    @ApiProperty()
    IsActive: boolean

    @AutoMap()
    @ApiProperty()
    StartDate: Date

    @AutoMap()
    @ApiProperty()
    EndDate: Date

    constructor(IsActive: boolean, StartDate: Date, EndDate: Date,FirstName: string, ProfilePhoto: string) {
        super(FirstName,ProfilePhoto)
        
        this.IsActive = IsActive
        this.StartDate = StartDate
        this.EndDate = EndDate
    }
}