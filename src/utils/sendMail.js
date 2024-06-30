import nodemailer from 'nodemailer';

import { SMTP } from '../constants/contacts.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(
        500,
        'Failed to send the email, please try again later.',
      );
    throw err;
  }
};
