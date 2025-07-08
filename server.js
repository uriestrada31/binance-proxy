const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET;

app.post('/orden', async (req, res) => {
  try {
    const { symbol, side, quantity } = req.body;
    const timestamp = Date.now();
    const query = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${quantity}&timestamp=${timestamp}`;
    const signature = crypto.createHmac('sha256', SECRET_KEY).update(query).digest('hex');
    const url = `https://api.binance.com/api/v3/order?${query}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'X-MBX-APIKEY': API_KEY }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('🟢 Proxy Binance en línea');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy corriendo en puerto ${PORT}`));
