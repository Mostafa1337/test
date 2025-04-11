import { IFileTypes } from "./IFileTypes";

export class ImageFileType implements IFileTypes
{
    MimeTypes:string[]= ["image/jpg","image/jpeg","image/png","image/webp"];
    
    Extensions: string[] = ["jpg","jpeg","png","webp"];
}