import { Router } from 'express';

import authRouter from './auth.router.js';
import homeRouter from './home.router.js';
import studentsRouter from './students.router.js';

const router = Router();

router.use('/', homeRouter);
router.use('/students', studentsRouter);
router.use('/auth', authRouter);

export default router;
