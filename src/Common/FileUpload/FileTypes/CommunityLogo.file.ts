import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class CommunityLogoFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "/communities/logo/";

    FileType: IFileTypes = new ImageFileType();
}

export const CommunityLogoFileOptions =  new CommunityLogoFile();