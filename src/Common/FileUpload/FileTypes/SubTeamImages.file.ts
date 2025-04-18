import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class SubTeamImagesFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "/subTeams/images/";

    FileType: IFileTypes = new ImageFileType();
}

export const SubTeamImagesFileOptions =  new SubTeamImagesFile();