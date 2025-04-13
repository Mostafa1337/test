import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotFound extends HttpException
{
    constructor(filePath:string) {
        super(`File does not exist ${filePath}`,HttpStatus.NOT_FOUND)
    }
}
