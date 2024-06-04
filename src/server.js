import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

const PORT = env('PORT', 3000);

export const setupServer = () => {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
