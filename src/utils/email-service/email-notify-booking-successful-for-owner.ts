import { Options } from 'nodemailer/lib/mailer';
import { transporter } from './index';
export const sendEmailNotifyBookingSuccessfulForOwner = async ({
  receiverEmail,
}: {
  receiverEmail: string;
}) => {
  const mailOptions: Options = {
    from: process.env.SMTP_USER || 'da.booking2021@gmail.com',
    subject: 'Đặt phòng Booking',
    to: receiverEmail,
    html: `<p>Một phòng đã được đặt và chờ xác nhận</p>`, // html body
  };
  await transporter.sendMail(mailOptions);
  await transporter.close();
};
