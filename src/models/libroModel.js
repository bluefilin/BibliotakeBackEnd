import { Schema, model } from "mongoose";

const LibroSchema = new Schema(
  {
    titulo: String,
    autor : String,
    sinopsis : String,
    genero : String,
    // estado: { require: true, type: Schema.Types.ObjectId, ref: "estados" },
    disponibles : Number,
    alquileres: { type: Schema.Types.ObjectId, ref: "alquileres" },
    foto: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const libroModel = model("libros", LibroSchema);
export { libroModel };
