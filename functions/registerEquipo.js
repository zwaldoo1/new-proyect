import { registrarEquipo } from "./firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await registrarEquipo(req.body);
    res.status(200).json({ message: "Equipo registrado" });
  }
}
