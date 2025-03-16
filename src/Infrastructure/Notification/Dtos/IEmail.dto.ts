export interface IEmailDto<T>
{
    To: string;

    Subject:string;

    Message: string;

    HtmlTemplateFilePath:string;

    Context:T
}