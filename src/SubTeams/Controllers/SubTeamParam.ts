import { applyDecorators, ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { SubTeamSearchId } from "../Dtos/SubTeamSearchId";
import { ApiParam } from "@nestjs/swagger";

export class SubTeamParamPipe implements PipeTransform<SubTeamSearchId> {
  transform(value: any, metadata: ArgumentMetadata): SubTeamSearchId {
    const { communityId, teamId, subTeamId } = value;

    return new SubTeamSearchId(communityId, teamId, subTeamId);
  }
}

export function SubTeamParamDecorator(addSubTeam:boolean) {
  return applyDecorators(
    ApiParam({name:"communityId" , type:"string", description: "Community id"}),
    ApiParam({ name: 'teamId', description: 'Team Id' , type:"string"}),
    addSubTeam ? ApiParam({ name: 'subTeamId', description: 'Sub Team Id' , type:"string"}) : applyDecorators()
  );
}