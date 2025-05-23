import { Inject, Injectable, LoggerService, Scope } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable({scope:Scope.REQUEST})
export class LoggerMainService{
    ModuleName:string = "";
    
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly winston:LoggerService
    ){

    }

    public Info(logg:LoggerBasic,...messages:string[]):void{
        this.winston.log(messages,{...logg,ModuleName:this.ModuleName})
    }

    public Error(logg:LoggerError,...messages:string[]):void{
        this.winston.error(messages,{...logg,ModuleName:this.ModuleName})
    }
}