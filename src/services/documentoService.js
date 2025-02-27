import { existsSync, unlinkSync } from "fs";
import { join, resolve } from "path";
import { __dirname } from "../util/urlHandle.js";
import sharp from "sharp";



export const buscarArchivoAvatar = (nombreArhivo) => {
  return existsSync(resolve(__dirname, `../public/avatar/${nombreArhivo}`));
};

export const eliminarAvatarAlmacenServicio = (file) => {
  if (existsSync(join(__dirname, `../public/avatar/${file}`))) {
    unlinkSync(join(__dirname, `../public/avatar/${file}`));
  }
};

export const optimizarImagen = async (archivo, nombreArchivo) => {
  return await sharp(archivo)
    .resize(150)
    .toFormat("webp")
    .toFile(
      join(__dirname, `/public/avatar/${nombreArchivo.split(".")[0]}.webp`)
    );
};
export const optimizarImagenLibro = async (archivo, nombreArchivo) => {
  return await sharp(archivo)
    .resize(500, 700)
    .toFormat("webp")
    .toFile(
      join(__dirname, `/public/libros/${nombreArchivo.split(".")[0]}.webp`)
    );
};

