import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class TeamLogoFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "\\teams\\logo\\";

    FileType: IFileTypes = new ImageFileType();
}

export const TeamLogoFileOptions =  new TeamLogoFile();