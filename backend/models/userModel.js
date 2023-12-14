const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor agregue un nombre"],
    },
    correo: {
      type: String,
      required: [true, "Por favor agregue un correo"],
      unique: true,
    },
    contrasena: {
      type: String,
      required: [true, "Por favor agregue una contrasena"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
