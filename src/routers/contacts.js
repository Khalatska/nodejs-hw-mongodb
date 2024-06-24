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
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use('/:contactId', validateMongoId('contactId'));

router.use('/', authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',

  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  upload.single('photo'),
  ValidateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',

  ValidateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',

  ctrlWrapper(deleteContactController),
);

export default router;
