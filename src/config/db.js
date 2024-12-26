const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado con éxito");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

module.exports = connectDB;