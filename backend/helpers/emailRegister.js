import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
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
    subject: 'Confirm your account Veterinary',
    text: 'Confirm your account Veterinary',
    html: `<h2>Welcome ${name}</h2>
    <p>Please confirm your account Veterinary</p>
    <a href="${process.env.FRONTEND_URL}/ack/${token}">Confirm</a>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
  });

  console.log('Message sent: %s', mailInfo.messageId);
};
