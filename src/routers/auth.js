import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { ValidateBody } from '../middlewares/validateBody.js';
 

const router = Router();



router.post(
  '/register',
  ValidateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  ValidateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;

router.post('/logout', ctrlWrapper(logoutUserController));
