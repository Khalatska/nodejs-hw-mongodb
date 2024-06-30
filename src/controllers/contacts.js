import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import {
  parseSortParams,
  parseFilterParams,
} from '../utils/parsePaginationParams.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    activeUserId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id, req.user._id);
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
  const { body, file } = req;
  const contact = await createContact({ ...body, file }, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// export const patchContactController = async (req, res) => {
//   const { body, file } = req;
//   const { contactId } = req.params;
//   const result = await updateContact(
//     contactId,
//     { ...body, file },
//     req.user._id,
//   );

//   if (!result) {
//     throw createHttpError(404, 'Contact not found');
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contacts!`,
//     data: result,
//   });
// };
export const patchContactController = async (req, res) => {
  const { body, file } = req;
  const { contactId } = req.params;
  let updateData = { ...body };

  if (file) {
    updateData.photo = file;
  }

  const result = await updateContact(contactId, updateData, req.user._id);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
