import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class SubTeamLogoFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "/subTeams/logo/";

    FileType: IFileTypes = new ImageFileType();
}

export const SubTeamLogoFileOptions =  new SubTeamLogoFile();