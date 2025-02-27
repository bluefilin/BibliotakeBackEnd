import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { __dirname } from "../util/urlHandle.js";
import {eliminarAvatarAlmacenServicio, optimizarImagen} from "../services/documentoService.js";
import { actualizarFotoServicio, consultarFoto,obtenerFotoPerfilServicio} from "../services/usuarioService.js";
import { renombrarImagenes } from "../util/validation.js";

export const cargarImagenPerfil = async (req, res) => {
  try {
    const imagenBuffer = req.file.buffer;
    const nombreArchivo = renombrarImagenes(req.file.originalname);
    const fotoAntigua = await consultarFoto(req.params.id);
    if (fotoAntigua) {
      eliminarAvatarAlmacenServicio(fotoAntigua);
    }
    const image = await optimizarImagen(imagenBuffer, nombreArchivo);
    const respuesta = await actualizarFotoServicio(req.params.id,nombreArchivo);
    res.status(200).send({
      status: 200,
      mensaje: "Foto actualizada exitosamanete",
      foto: nombreArchivo,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAvatarPerfil = async (req, res) => {
  const id = req.params.id;
  try {
    const foto = await obtenerFotoPerfilServicio(id);
    console.log(foto);
    const archivo = join(__dirname, `./public/avatar/${foto}`);
    if (existsSync(archivo)) {
      res.status(200).sendFile(archivo);
    } else {
      res.status(404).send({ "error": "", "msg": "Imagen No existe" })
    }
  } catch (error) {
    console.log();(error, res);
  }
};
export const getLibroImg = async (req, res) => {
  const idArchivo = req.params.id;
  try {
    const archivo = join(__dirname, `./public/libros/${idArchivo}`);
    if (existsSync(archivo)) {
      return res.sendFile(archivo);
    } else {
      const errorMessage = "Imagen no existe";
      throw createHttpError(404, errorMessage);
    }
  } catch (error) {
    console.log(error, res);
  }
};