import { Global, Module } from "@nestjs/common";
import { IFileServiceProvider } from "./IFile.service";

@Global()
@Module({
  providers: [IFileServiceProvider],
  exports: [IFileServiceProvider]
})
export class FileModule {}