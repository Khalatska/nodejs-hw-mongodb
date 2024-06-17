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
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkConnection } from '../middlewares/checkConnection.js';

const router = Router();
router.use('/:contactId', validateMongoId('contactId'));

router.use('/', authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkConnection,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  ValidateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkConnection,
  ValidateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkConnection,
  ctrlWrapper(deleteContactController),
);

export default router;
