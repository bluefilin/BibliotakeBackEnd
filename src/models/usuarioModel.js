import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombres: String,
    apellidos: String,
    correo: String,
    contrasenia: String,
    rol: String,
    libros: { type: Schema.Types.ObjectId, ref: "libros" },
    alquileres: { type: Schema.Types.ObjectId, ref: "alquileres" },
    foto: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);
const usuarioModel = model("usuarios", usuarioSchema);
export { usuarioModel };
