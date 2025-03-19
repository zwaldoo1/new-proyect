import express from "express";
import { processPayment } from "./payment.js";
import { registerParticipant } from "./register.js";

const router = express.Router();
router.post("/payment", processPayment);
router.post("/register", registerParticipant);

export default router;
