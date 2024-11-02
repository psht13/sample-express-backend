import nodemailer from 'nodemailer';

import { env } from './env.js';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: env(SMTP.SMTP_PORT),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
