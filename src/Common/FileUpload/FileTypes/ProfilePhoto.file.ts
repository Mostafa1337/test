import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class ProfilePhotoFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "\\profile\\images\\";

    FileType: IFileTypes = new ImageFileType();
}

export const ProfilePhotoFileOptions =  new ProfilePhotoFile();