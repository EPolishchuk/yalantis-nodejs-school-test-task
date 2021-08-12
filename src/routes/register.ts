import { Router } from 'express';
import {
  registerSchema,
  isImage,
  resizeSaveImage,
  NO_IMAGE,
} from '../validation';
import multer from 'multer';
import shortid from 'shortid';
import { pool } from '../config';

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

    const id = shortid.generate();
    await resizeSaveImage(buffer, id);
    const { email, firstName, lastName } = req.body;

    res.json({
      message: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        photo: id,
      },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
