import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ResponseType } from "./ResponseType";

export class GlobalExceptionFilter implements ExceptionFilter
{
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const req:Request = context.getRequest();
        const res:Response = context.getResponse();

        if(exception instanceof HttpException)
        {
            const statusCode:number = exception.getStatus();
            const exResp = exception.getResponse();
            res.status(exception.getStatus()).json(new ResponseType(
                statusCode,
                exception.message,
                (exResp as any )?.Data ?? null,
                exception.name
            ))
        }
        else if (exception instanceof ResponseType)
        {
            res.status(exception.StatusCode).json(exception)
        }
        else
        {
            res.status(500).json(new ResponseType<void>(HttpStatus.INTERNAL_SERVER_ERROR,'Error has happend try again later',null,'Internal Server error'))
        }

        res.end();
        context.getNext();
    }
}