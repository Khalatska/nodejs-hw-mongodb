import { getAllContacts } from '../services/contacts.js';
import { getContactById } from '../services/contacts.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 400,
      message: `${id} is not valid`,
    });
  }
  const contact = await getContactById(id);
  if (!contact) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contacts!`,
    data: contact,
  });
};
