const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const BASE_URL = "https://api.binance.com";
const API_KEY = process.env.BINANCE_API_KEY;
const SECRET = process.env.BINANCE_SECRET;

app.use(express.json());

function signQuery(query) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(query)
    .digest("hex");
}

app.get("/api/account", async (req, res) => {
  try {
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = signQuery(queryString);

    const response = await axios.get(`${BASE_URL}/api/v3/account?${queryString}&signature=${signature}`, {
      headers: { "X-MBX-APIKEY": API_KEY }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener cuenta",
      details: error.response ? error.response.data : error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Proxy seguro Binance activo!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
