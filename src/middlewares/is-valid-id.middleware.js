import { isValidObjectId } from 'mongoose';

import createHttpError from 'http-errors';

export const isValidId = (id) => (req, res, next) => {
  const oid = req.params[id];

  if (!isValidObjectId(oid)) {
    return next(createHttpError(400, 'Bad Request'));
  }
  next();
};
