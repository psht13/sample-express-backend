import { Router } from 'express';

import authRouter from './auth.router.js';
import studentsRouter from './students.router.js';

const router = Router();

router.use('/students', studentsRouter);
router.use('/auth', authRouter);

export default router;
