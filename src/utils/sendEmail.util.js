import { createTransport } from "nodemailer";

const sendMail = async ({ to, subject, text }) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: `"Smartfun Studios"<${process.env.NODE_MAILER_EMAIL}>`,
    to,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export { sendMail };
