// server.js
const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// Función para firmar query strings con HMAC SHA256
function sign(query) {
  return crypto
    .createHmac("sha256", process.env.BINANCE_SECRET)
    .update(query)
    .digest("hex");
}

// Ruta segura para consultar balances
app.get("/api/account", async (req, res) => {
  try {
    const timestamp = Date.now();
    const query = `timestamp=${timestamp}`;
    const signature = sign(query);
    const finalQuery = `${query}&signature=${signature}`;

    const response = await axios.get(`https://api.binance.com/api/v3/account?${finalQuery}`, {
      headers: {
        "X-MBX-APIKEY": process.env.BINANCE_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error al consultar Binance:", error.response?.data || error.message);
    res.status(500).json({ error: "No se pudo obtener información de Binance" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
