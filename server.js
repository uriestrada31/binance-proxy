const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api/account", async (req, res) => {
  res.json({ message: "¡Ruta activa y funcionando!" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
