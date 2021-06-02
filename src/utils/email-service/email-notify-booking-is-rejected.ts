import { Options } from 'nodemailer/lib/mailer';
import { transporter } from './index';
export const sendEmailNotifyBookingIsRejected = async ({
  receiverEmail,
}: {
  receiverEmail: string;
}) => {
  const mailOptions: Options = {
    from: process.env.SMTP_USER || 'da.booking2021@gmail.com',
    subject: 'Đặt phòng Booking',
    to: receiverEmail,
    html: `<p>Phòng bạn đã đặt không được chấp nhận bởi admin</p>`, // html body
  };
  await transporter.sendMail(mailOptions);
  await transporter.close();
};
