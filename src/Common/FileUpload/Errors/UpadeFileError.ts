import { HttpException, HttpStatus } from "@nestjs/common";

export class UpadeFileError extends HttpException
{
    constructor() {
        super(`Error while updateing file`,HttpStatus.BAD_REQUEST)
    }
}
