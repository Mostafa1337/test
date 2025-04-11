import { HttpException, HttpStatus } from "@nestjs/common";

export class DeleteFileError extends HttpException
{
    constructor() {
        super(`Error while deleting file`,HttpStatus.BAD_REQUEST)
    }
}
