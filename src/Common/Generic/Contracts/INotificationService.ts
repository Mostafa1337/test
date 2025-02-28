export interface INotification
{
    SendResetPass(toEmail:string,code:number):Promise<void>

    SentNotification()

    SendEmailAndNotification()
}

export const INotification = Symbol('INotification')