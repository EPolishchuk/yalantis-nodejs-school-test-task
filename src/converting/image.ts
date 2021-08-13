import gm from 'gm';
import path from 'path';
import fs from 'fs';
import { imageConfig, imageFolder } from '../config';

export const resizeSaveImage = async (buffer: Buffer, id: string) => {
  const fileName = `${id}.${imageConfig.format}`;
  const folderPath = path.join(__dirname, `../${imageFolder}`);
  const filePath = path.join(folderPath, fileName);

  await createFolder(folderPath);

  return new Promise((resolve, reject) => {
    gm(buffer)
      .gravity(imageConfig.aligment)
      .crop(imageConfig.height, imageConfig.widht)
      .write(filePath, (err) => {
        if (err) reject(err);
        else resolve(fileName);
      });
  });
};

const createFolder = async (folderPath: string) => {
  await fs.promises.mkdir(folderPath, { recursive: true });
};
