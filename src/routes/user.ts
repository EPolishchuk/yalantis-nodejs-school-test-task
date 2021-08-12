import { Router } from 'express';
import { findUser } from '../db';

const router = Router();

router.get('/user/:id', async (req, res) => {
  try {
    let user = await findUser(req.params.id);
    res.json({ user: user });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
