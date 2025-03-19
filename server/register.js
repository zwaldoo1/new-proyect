import pool from "./database.js";
import sendEmail from "./mailer.js";

export const registerParticipant = async (req, res) => {
  const { nombre, email, equipo } = req.body;

  try {
    await pool.query("INSERT INTO participantes (nombre, email, equipo, pagado) VALUES ($1, $2, $3, true)", [nombre, email, equipo]);
    await sendEmail(email, "Inscripción Confirmada", "Gracias por inscribirte en el torneo.");
    res.status(201).json({ message: "Inscripción exitosa." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 