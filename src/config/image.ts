require('dotenv').config({ path: './.env.local' });

const {
  IMG_FORMAT = 'jpg',
  IMG_HEIGHT = 200,
  IMG_WIDTH = 200,
  IMG_ALIGMENT = 'Center',
  IMG_FOLDER = 'uploads',
} = process.env;

const IMG_CONFIG = {
  format: IMG_FORMAT,
  height: +IMG_HEIGHT,
  widht: +IMG_WIDTH,
  aligment: IMG_ALIGMENT,
};

export const imageConfig = IMG_CONFIG;
export const imageFolder = IMG_FOLDER;
