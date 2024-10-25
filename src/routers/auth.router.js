import express from 'express';

import { Router } from 'express';
import { validateBody } from '../middlewares/validate-body.middleware';
import { registerUserSchema } from '../validation/auth.schema';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserController } from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  express.json(),
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
