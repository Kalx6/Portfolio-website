import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { saveContactMessage } from "../repositories/contact.repository.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function submitContactMessage({
  name,
  email,
  message,
  ipAddress,
}) {
  const saved = await saveContactMessage({ name, email, message, ipAddress });

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${env.EMAIL_USER}>`,
    to: env.EMAIL_TO,
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });

  return saved;
}
