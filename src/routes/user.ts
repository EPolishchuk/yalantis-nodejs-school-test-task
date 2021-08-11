import { Router } from 'express';

const router = Router();

router.get('/user/:id', (req, res) => {
  res.json({ userId: req.params.id });
});

export default router;
