import createHttpError from 'http-errors';

import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.service.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveToCloudinary.js';

export const getAllStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllStudents(page, perPage, sortOrder, sortBy, filter);
  const { count, totalPages, students } = data;

  res.status(200).json({
    status: 200,
    message:
      students.length !== 0
        ? 'Successfully got students!'
        : 'No students found by this query',
    page,
    perPage,
    count,
    totalPages,
    students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) throw createHttpError(404, 'Student not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully got student!',
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const student = await createStudent({ ...req.body, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) throw createHttpError(404, 'Student not found');

  res.status(204).json({
    status: 204,
    message: 'Successfully deleted student!',
  });
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateStudent(
    studentId,
    { ...req.body, photoUrl },
    {
      upsert: true,
    },
  );

  if (!result) throw createHttpError(404, 'Student not found');

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Student suc        cessfully upserted!',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateStudent(
    studentId,
    { ...req.body, photoUrl },
    {
      upsert: true,
    },
  );

  if (!result) throw createHttpError(404, 'Student not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched student',
    data: result.student,
  });
};
