import { Router } from 'express';
import {
  registerSchema,
  isImage,
  resizeSaveImage,
  NO_IMAGE,
} from '../validation';
import multer from 'multer';
import shortid from 'shortid';
import { addUser, userExist } from '../db';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });

    let buffer = req?.file?.buffer;
    if (!buffer) {
      return res.json({ message: NO_IMAGE });
    } else {
      await isImage(buffer);
    }

    const photoId = shortid.generate();
    await resizeSaveImage(buffer, photoId);
    req.body.photo = photoId;

    let isUserExist = await userExist(req.body.email);
    if (isUserExist) {
      res.json({
        message: `User with email ${req.body.email} is already exist`,
      });
    } else {
      let userId = await addUser(req.body);
      res.json({ id: userId });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
