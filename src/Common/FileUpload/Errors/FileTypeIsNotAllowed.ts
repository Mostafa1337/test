import { HttpException, HttpStatus } from "@nestjs/common";

export class FileTypeIsNotAllowed extends HttpException
{
    constructor(mimetypes:string[],allowedExtensions:string[]) {
        super(`Invalid File type, allowed MIME types: ${mimetypes}, Allowd Extensions: ${allowedExtensions}`,HttpStatus.BAD_REQUEST)
    }
}
