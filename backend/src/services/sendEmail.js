import transporter from '../config/node-mailer';

export const sendEmail = async (recipientEmail, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
