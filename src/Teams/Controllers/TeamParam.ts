import { applyDecorators, ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TeamSearchId } from "src/Teams/Dtos/TeamSearchId";

export class TeamParamPipe implements PipeTransform<TeamSearchId>
{
    transform(value: any, metadata: ArgumentMetadata) : TeamSearchId {
        const { communityId, teamId } = value;
    
        return new TeamSearchId(communityId,teamId); 
    }
}