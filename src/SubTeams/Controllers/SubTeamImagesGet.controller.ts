import { Controller, Get, Header, Inject, Param, StreamableFile } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SubTeamImagesFileOptions } from "src/Common/FileUpload/FileTypes/SubTeamImages.file";
import { SubTeamLogoFileOptions } from "src/Common/FileUpload/FileTypes/SubTeamLogo.file";
import { IFileService } from "src/Common/FileUpload/IFile.service";

@ApiTags('sub teams')
@Controller('subteams')
export class SubTeamImagesGet
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
        return await this.fileService.Get(`${SubTeamLogoFileOptions.Dest}${imagename}`, SubTeamLogoFileOptions)
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
        return await this.fileService.Get(`${SubTeamImagesFileOptions.Dest}${imagename}`, SubTeamImagesFileOptions)
    }
}