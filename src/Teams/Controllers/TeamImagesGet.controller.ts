import { Controller, Get, Header, Inject, Param, StreamableFile } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TeamAchievementImagesFileOptions } from "src/Common/FileUpload/FileTypes/TeamAchievement.file";
import { TeamImagesFileOptions } from "src/Common/FileUpload/FileTypes/TeamImages.file";
import { TeamLogoFileOptions } from "src/Common/FileUpload/FileTypes/TeamLogo.file";
import { IFileService } from "src/Common/FileUpload/IFile.service";

@ApiTags('teams')
@Controller('teams')
export class TeamImagesGet
{
    constructor(
        @Inject(IFileService)
        private readonly fileService:IFileService
    ) { }

    @Get('logo/:imagename')
    @Header('Content-Type', 'application/octet-stream')
    @ApiOkResponse({
        description: 'Returns a file as an octet-stream',
        content: {
            'application/octet-stream': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiNotFoundResponse()
    async handleGetLogo(
        @Param("imagename") imagename: string
    ): Promise<StreamableFile> {
        return await this.fileService.Get(`${TeamLogoFileOptions.Dest}${imagename}`, TeamLogoFileOptions)
    }

    @Get('images/:imagename')
    @Header('Content-Type', 'application/octet-stream')
    @ApiOkResponse({
        description: 'Returns a file as an octet-stream',
        content: {
            'application/octet-stream': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiNotFoundResponse()
    async handleGetImages(
        @Param("imagename") imagename: string
    ): Promise<StreamableFile> {
        return await this.fileService.Get(`${TeamImagesFileOptions.Dest}${imagename}`, TeamImagesFileOptions)
    }

    @Get('achievements/:imagename')
    @Header('Content-Type', 'application/octet-stream')
    @ApiOkResponse({
        description: 'Returns a file as an octet-stream',
        content: {
            'application/octet-stream': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiNotFoundResponse()
    async handleGetAchievements(
        @Param("imagename") imagename: string
    ): Promise<StreamableFile> {
        return await this.fileService.Get(`${TeamAchievementImagesFileOptions.Dest}${imagename}`, TeamAchievementImagesFileOptions)
    }
}