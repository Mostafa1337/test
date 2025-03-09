export interface INotification
{
    SendResetPass(toEmail:string,code:number):Promise<void>

    SendVerifyLink(toEmail:string,token:string):Promise<void>

    SentNotification()

    SendEmailAndNotification()
}

export const INotification = Symbol('INotification')