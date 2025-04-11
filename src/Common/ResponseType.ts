import { HttpStatus } from "@nestjs/common";

export class ResponseType<T>
{
    StatusCode:HttpStatus;
    Message:string;
    Data:T=null
    Error:string;
    Success:boolean
    Time:Date = new Date();

    constructor(statusCode:HttpStatus,message:string,data:T=null,error:string=null) {
        this.StatusCode = statusCode
        this.Message = message
        this.Data = data
        this.Error = error

        this.Success = statusCode >= 200 && statusCode <= 300;
    }
}