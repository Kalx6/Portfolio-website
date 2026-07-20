import { contactSchema } from "../validators/contact.validator.js";
import { submitContactMessage } from "../services/contact.service.js";
import { AppError } from "../utils/AppError.js";

export async function handleContactSubmission(req, res, next) {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0].message;
      throw new AppError(firstError, 400);
    }

    const { name, email, message } = parsed.data;
    const ipAddress = req.ip;

    const saved = await submitContactMessage({
      name,
      email,
      message,
      ipAddress,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: { id: saved.id, createdAt: saved.created_at },
    });
  } catch (err) {
    next(err); // hands off to errorHandler middleware
  }
}
