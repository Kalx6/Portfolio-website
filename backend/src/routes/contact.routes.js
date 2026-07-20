import { Router } from "express";
import { handleContactSubmission } from "../controllers/contact.controller.js";
import { contactFormLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/", contactFormLimiter, handleContactSubmission);

export default router;
