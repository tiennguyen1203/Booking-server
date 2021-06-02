import { Options } from 'nodemailer/lib/mailer';
import { transporter } from './index';
export const sendEmailNotifyBookingSuccessfulForSender = async ({
  receiverEmail,
}: {
  receiverEmail: string;
}) => {
  const mailOptions: Options = {
    from: process.env.SMTP_USER || 'da.booking2021@gmail.com',
    subject: 'Đặt phòng Booking',
    to: receiverEmail,
    html: `<p>Phòng bạn đã đặt đang được xử lý, vui lòng kiểm tra email thường xuyên để biết thêm chi tiết</p>`, // html body
  };
  await transporter.sendMail(mailOptions);
  await transporter.close();
};
