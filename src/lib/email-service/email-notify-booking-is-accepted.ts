import { Options } from 'nodemailer/lib/mailer';
import { transporter } from './index';
export const sendEmailNotifyBookingIsAccepted = async ({
  receiverEmail,
}: {
  receiverEmail: string;
}) => {
  const mailOptions: Options = {
    from: process.env.SMTP_USER || 'da.booking2021@gmail.com',
    subject: 'Đặt phòng Booking',
    to: receiverEmail,
    html: `<p>Phòng bạn đặt đã được chấp nhận bởi admin, vui lòng đến đúng ngày checkin để nhận phòng</p>`, // html body
  };
  await transporter.sendMail(mailOptions);
  await transporter.close();
};
