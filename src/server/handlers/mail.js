import { createTransport, createTestAccount } from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';

let transporter = null;

// Generate SMTP service account from ethereal.email
createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return;
  }

  console.log('Credentials obtained, sending message...');

  // Create a SMTP transporter object
  transporter = createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
});

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS
//   }
// });

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  const inlined = juice(html);
  return inlined;
};

export default {
  async send(options) {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);

    const mailOptions = {
      from: `Plor <noreply@plor.io>`,
      to: options.user.email,
      subject: options.subject,
      html,
      text
    };
    await transport.sendMail(mailOptions);
  }
};
