import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parseSortParams } from '../utils/parsePaginationParams.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
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

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contacts!`,
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
