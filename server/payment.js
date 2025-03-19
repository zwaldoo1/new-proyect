import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

export const processPayment = async (req, res) => {
  try {
    const { nombre, email, equipo } = req.body;
    const payment = await mercadopago.preferences.create({
      items: [{ title: "Inscripción Campeonato", quantity: 1, currency_id: "CLP", unit_price: 5000 }],
      payer: { email },
      back_urls: { success: "http://localhost:3000/success", failure: "http://localhost:3000/failure" },
      auto_return: "approved",
    });

    res.json({ url: payment.body.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
