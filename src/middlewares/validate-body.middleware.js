import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    schema.validate(req.body, { abortEarly: true });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', { errors: err.details });
    next(error);
  }
};
