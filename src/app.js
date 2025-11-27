const express = require("express");
const path = require("path");
const { config } = require("./config/config");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

// Parseo JSON
app.use(express.json());

// Servir archivos estáticos (frontend)
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// Rutas API
app.use("/api", paymentRoutes);

// Levantar servidor
app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
