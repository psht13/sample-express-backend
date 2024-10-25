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

const router = Router();

router.get('/', ctrlWrapper(getAllStudentsController));

router.get(
  '/:studentId',
  isValidId('studentId'),
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/',
  express.json(),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:studentId', ctrlWrapper(deleteStudentController));

router.put(
  '/:studentId',
  express.json(),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  express.json(),
  validateBody(createStudentController),
  ctrlWrapper(patchStudentController),
);

export default router;
