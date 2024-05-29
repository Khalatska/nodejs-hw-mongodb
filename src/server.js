import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';
import mongoose from 'mongoose';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 400,
        message: `${id} is not valid`,
      });
    }
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Student with id ${id} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contacts!`,
      data: contact,
    });
  });

  app.use('*', (req, res) => {
    res.status(400).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
