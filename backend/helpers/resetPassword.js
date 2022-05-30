import nodemailer from 'nodemailer';

export const resetPassword = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { name, email, token } = data;

  const mailInfo = await transport.sendMail({
    from: 'Admin Veterinary',
    to: email,
    subject: 'Reset your password Veterinary',
    text: 'Reset your password Veterinary',
    html: `<h2>Welcome ${name} you can reset your password here.</h2>
    <p>Please confirm your new Password Veterinary</p>
    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset your Password</a>
    <p>Your token is <b>"${token}"</b></p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
  });

  console.log('Message sent: %s', mailInfo.messageId);
};
