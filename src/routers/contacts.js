import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { ValidateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  ValidateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  ValidateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
