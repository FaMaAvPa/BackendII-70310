require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const connectDB = require("./config/db");
const sessionRoutes = require("./routes/sessions");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Inicializamos passport

// Conectar MongoDB
connectDB();

// Rutas
app.use("/api/sessions", sessionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));