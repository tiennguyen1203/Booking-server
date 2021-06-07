import * as nodemailer from 'nodemailer';
import { sendEmailNotifyBookingIsAccepted } from './email-notify-booking-is-accepted';
import { sendEmailNotifyBookingSuccessfulForOwner } from './email-notify-booking-successful-for-owner';
import { sendEmailNotifyBookingSuccessfulForSender } from './email-notify-booking-sucessful-for-sender';
import { sendEmailNotifyBookingIsRejected } from './email-notify-booking-is-rejected';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // <= your smtp server here
  // port: process.env.SMTP_PORT, // <= connection port
  secure: true,
  port: 465,
  pool: true,
  auth: {
    user: process.env.SMTP_USER || 'da.booking2021@gmail.com', // <= smtp login user
    pass: process.env.SMTP_PASS || '01228129873a', // <= smtp login pass
  },
});

export {
  sendEmailNotifyBookingSuccessfulForSender,
  sendEmailNotifyBookingSuccessfulForOwner,
  sendEmailNotifyBookingIsAccepted,
  sendEmailNotifyBookingIsRejected,
};
