import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL_HOST,
  port: 587,
  service: process.env.SMTP_MAIL_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL_USER,
    pass: process.env.SMTP_MAIL_PASS,
  },
});

export const contactus = async (msg: any) => {
  try {
    const options = {
      from: process.env.SMTP_MAIL_USER,
      to: msg.email,
      subject: "Gurez",
      text: `${msg.name} ${msg.message}`,
    };
   return await transporter.sendMail(options);
  } catch (err) {
    console.log(err)
  }
};
