import { Schema, model } from "mongoose";

const AlquiladosSchema = new Schema(
  {
    idUsuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
    idLibro: { type: Schema.Types.ObjectId, ref: "libros" },
    fechaAlquiler: { type: Date, default: Date.now },
    fechaDevolucion: Date,
    estado: String,
  },
  { versionKey: false, timestamps: true }
);

const alquiladosModel = model("alquilados", AlquiladosSchema);
export { alquiladosModel };
