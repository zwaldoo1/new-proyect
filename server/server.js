import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import paymentRoutes from "./src/server/payment.js";
import participantRoutes from "./src/server/routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/payment", paymentRoutes);
app.use("/api/participants", participantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
