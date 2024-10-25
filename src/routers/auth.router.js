import express from 'express';

import { Router } from 'express';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.schema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  express.json(),
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  express.json(),
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
