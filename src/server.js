import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { pinoHttpConfig } from './utils/config.js';

import router from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { notFoundHandler } from './middlewares/notFoundHandler.middleware.js';
import { swaggerDocs } from './middlewares/swagger-docs.middleware.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = env('PORT', 3000);

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(pino(pinoHttpConfig));

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is available on port ${PORT}`);
  });
};
