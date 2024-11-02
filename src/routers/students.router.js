import express from 'express';

import { Router } from 'express';

import {
  createStudentController,
  deleteStudentController,
  getAllStudentsController,
  getStudentByIdController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.controller.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import { createStudentSchema } from '../validation/students.schema.js';
import { isValidId } from '../middlewares/is-valid-id.middleware.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { checkRoles } from '../middlewares/check-role.middleware.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/mutler.middleware.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getAllStudentsController),
);

router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId('studentId'),
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/',
  express.json(),
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);

router.put(
  '/:studentId',
  express.json(),
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  express.json(),
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(createStudentController),
  upload.single('photo'),
  ctrlWrapper(patchStudentController),
);

export default router;
