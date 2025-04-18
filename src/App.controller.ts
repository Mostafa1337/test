import { Controller, Get, Inject, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {

    @Get(':anything/logo/default')
    async handleLogoDefault(@Param('anything') anything: string) : Promise<StreamableFile>
    {
        const filePath = join(__dirname, 'Common', 'FileUpload', 'defaultlogo.jpg');

        const file = createReadStream(filePath);
        return new StreamableFile(file);
    }
}