import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class TeamAchievementImagesFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "\\teams\\achievements\\";

    FileType: IFileTypes = new ImageFileType();
}

export const TeamAchievementImagesFileOptions =  new TeamAchievementImagesFile();