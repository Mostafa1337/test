import { HttpException, HttpStatus } from "@nestjs/common";

export class MaximumFileSizeExceeds extends HttpException
{
    constructor(size:number,maxSize:number) {
        super(`File size: ${size} Maximum file size: ${maxSize}`,HttpStatus.BAD_REQUEST)
    }
}