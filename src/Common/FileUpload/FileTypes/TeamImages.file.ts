import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class TeamImagesFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "\\teams\\images\\";

    FileType: IFileTypes = new ImageFileType();
}

export const TeamImagesFileOptions =  new TeamImagesFile();