import express from 'express';

import { Router } from 'express';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.schema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
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

router.post(
  '/request-reset-email',
  express.json(),
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  express.json(),
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default router;
