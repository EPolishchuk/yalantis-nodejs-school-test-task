const NOT_AN_IMAGE_GM = 'gm identify: Request did not return an image';
export const NO_IMAGE = "You didn't upload a photo";
export const NOT_AN_IMAGE = 'Your photo is corrupted. Use a different file';
import gm from 'gm';

export const resizeSaveImage = (buffer: Buffer, id: string) => {
  return new Promise((resolve, reject) => {
    const fileName = `${id}.jpg`;
    gm(buffer)
      .resize(200, 200, '^')
      .gravity('Center')
      .crop(200, 200)
      .write(`./uploads/${fileName}`, function (err) {
        if (err) reject(err);
        else resolve(fileName);
      });
  });
};

export const isImage = (buffer: Buffer): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    gm(buffer).format((err, value) => {
      if (err) reject(new Error(handle(err)));
      if (value) resolve(true);
    });
  });
};

const handle = (err: Error) => {
  if (!err.message.match(NOT_AN_IMAGE_GM)) {
    return err.message;
  } else return NOT_AN_IMAGE;
};
