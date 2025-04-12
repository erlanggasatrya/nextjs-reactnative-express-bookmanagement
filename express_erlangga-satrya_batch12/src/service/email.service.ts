import nodemailer from "nodemailer";
import { env } from "../config/env.config";

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: "erlanggasatrya18@gmail.com",
        pass: "vudd paam cuvj yxij",
      },
    });

    const mailOptions = {
      from: "erlanggasatrya18@gmail.com",
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
