const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Ruta de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Usuario no encontrado");

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true }).send("Login exitoso");
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta de validación del usuario actual
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send(req.user);
});

module.exports = router;