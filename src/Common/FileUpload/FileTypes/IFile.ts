import { IFileTypes } from "./Types/IFileTypes"

export interface IFile
{
    MaxSize:number

    Dest:string

    FileType:IFileTypes
}