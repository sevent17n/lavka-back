import { Injectable } from '@nestjs/common';
import { FileResponse } from './file.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export default class FilesService {
  public async saveFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<FileResponse> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
    return {
      url: `/uploads/${folder}/${file.originalname}`,
      name: file.originalname,
    };
  }
}
