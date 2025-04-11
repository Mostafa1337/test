import { BadRequestException, Body, Controller, Delete, HttpStatus, Inject, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { ITeamsAchievementService } from "../Services/ITeamAchievement.service";
import { CurrentUserDecorator } from "src/AuthModule/CurrentUser.decorator";
import { TokenPayLoad } from "src/AuthModule/Dtos/TokenPayload";
import { JWTGaurd } from "src/AuthModule/Gaurds/JWT.gaurd";
import { ResponseType } from "src/Common/ResponseType";
import { TeamCardDto } from "../Dtos/TeamCard.dto";
import { TeamAchievementCreateDto, TeamAchievementDto } from "../Dtos/TeamAchievement";
import { FilesInterceptor } from "@nestjs/platform-express";

@ApiTags('teams')
@Controller('communities/:communityId/teams/:teamId/achievement')
export class TeamAchievementController {

    constructor(
        @Inject(ITeamsAchievementService)
        private readonly service: ITeamsAchievementService
    ) { }

    @Post()
    @UseGuards(JWTGaurd)
    @UseInterceptors(FilesInterceptor("file", 1))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            allOf: [
                { type: getSchemaPath(TeamAchievementCreateDto) },
                {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            ],
        },
    })
    @ApiParam({ name: "communityId", type: "string", description: "Community id" })
    @ApiParam({ name: "teamId", type: "string", description: "Team id where the team will br added to" })
    @ApiOperation({ summary: 'Creates a new Achievement in the team' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Achievement created successfully', type: TeamCardDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request if file is not valid or data is not valid' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The community/team doesn`t exist or the user is not authorized' })
    async AddTeam(
        @Body() dto: TeamAchievementCreateDto,
        @Param("teamId") teamId: string,
        @UploadedFiles() files: Express.Multer.File[],
        @CurrentUserDecorator() user: TokenPayLoad
    ): Promise<ResponseType<TeamAchievementDto>> {
        if (!files || files?.length === 0) {
            throw new BadRequestException("Upload valid file")
        }
        
        const insertedCard = await this.service.Add(teamId, files[0], dto, user.UserId);
        return new ResponseType<TeamAchievementDto>(201, "Added achievement successfully", insertedCard)
    }

    @Delete(":achId")
    @UseGuards(JWTGaurd)
    @ApiBearerAuth()
    @ApiParam({ name: "communityId", type: "string", description: "Community id" })
    @ApiParam({ name: "teamId", type: "string", description: "Team id" })
    @ApiParam({ name: "achId", type: "string", description: "Achievement id" })
    @ApiOperation({ summary: 'Delete a Achievement in the team' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Achievement deleted successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The community/team doesn`t exist or the user is not authorized' })
    async DeleteAchievement(
        @Param("achId") achId: string,
        @Param("teamId") teamId: string,
        @CurrentUserDecorator() user: TokenPayLoad
    ): Promise<ResponseType<void>> {
        await this.service.Delete(teamId, achId, user.UserId)
        return new ResponseType<void>(HttpStatus.OK, "Delete achievement successfully")
    }

}