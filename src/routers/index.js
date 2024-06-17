import { Router } from 'express';
import authRouter from '../routers/auth.js';
import contactRouter from '../routers/contacts.js';

const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRouter);

export default router;
