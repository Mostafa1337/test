import { HttpException, HttpStatus } from "@nestjs/common";

export class FileAlreadyExist extends HttpException
{
    constructor(filePath:string) {
        super(`File already exists: ${filePath}`,HttpStatus.CONFLICT)
    }
}