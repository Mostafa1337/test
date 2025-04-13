import { IFile } from "./IFile";
import { IFileTypes } from "./Types/IFileTypes";
import { ImageFileType } from "./Types/Image.filetypes";

class CommunityImagesFile implements IFile
{
    MaxSize: number = 1024 * 1024 * 5;

    Dest: string = "/communities/images/";

    FileType: IFileTypes = new ImageFileType();
}

export const CommunityImagesFileOptions =  new CommunityImagesFile();