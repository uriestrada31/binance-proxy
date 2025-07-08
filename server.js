import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/account', async (req, res) => {
  res.json({ message: '¡Ruta funcionando!' });
});

app.listen(port, () => {
  console.log(`Servidor activo en http://0.0.0.0:${port}`);
});
