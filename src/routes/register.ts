import { Router } from 'express';
import { pool } from '../config';

const router = Router();

router.post('/register', (req, res) => {
  console.log(req.body);
  res.json({ message: 'This is register route' });
});

export default router;
