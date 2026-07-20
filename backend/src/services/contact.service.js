import { Resend } from "resend";
import { env } from "../config/env.js";
import { saveContactMessage } from "../repositories/contact.repository.js";

const resend = new Resend(env.RESEND_API_KEY);

export async function submitContactMessage({
  name,
  email,
  message,
  ipAddress,
}) {
  const saved = await saveContactMessage({ name, email, message, ipAddress });

  await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: env.EMAIL_TO,
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });

  return saved;
}
