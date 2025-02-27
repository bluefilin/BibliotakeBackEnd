import {
  actualizarLibroServicio,
  obtenerLibroIdServicio,
  obtenerLibrosServicio,
  publicarLibroServicio,
  // obtenerRetosUsuarioIdServicio,
} from "../services/libroService.js";
import { manejoMensajes } from "../util/manejoMensajes.handle.js";
import { renombrarImagenes } from "../util/validation.js";
// import { quitarCamposVacios } from "../util/validation.js"
import { optimizarImagenLibro } from "../services/documentoService.js";

export const publicarLibro = async (req, res) => {
  try {
    const imagenBuffer = req.file.buffer;
    const nombreArchivo = renombrarImagenes(req.file.originalname);
    const image = await optimizarImagenLibro(imagenBuffer, nombreArchivo);
    const libro = await publicarLibroServicio(req.body, nombreArchivo);
    console.log("Libro publicado");
    res.status(201).json(libro);
  } catch (error) {
    console.log("Error al publicar libro");
    manejoMensajes(error, res);
  }
};

export const obtenerLibros = async (req, res) => {
  try {
    const retos = await obtenerLibrosServicio();
    console.log("Listar libros");
    res.status(200).json(retos);
  } catch (error) {
    console.log("Error al listar libros");
    manejoMensajes(error, res);
  }
};

export const obtenerLibroId = async (req, res) => {
  try {
    const reto = await obtenerLibroIdServicio(req.params.id);
    console.log(`Obtener reto con id ${req.params.id}`);
    res.status(200).json(reto);
  } catch (error) {
    console.log(`Error al obtener reto por id ${req.params.id}`);
    manejoMensajes(error, res);
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    // const data = quitarCamposVacios(req.body);
    const reto = await actualizarLibroServicio(id, req.body);
    console.log(`Actualizar libro con id ${req.params.id}`);
    res.status(200).json(reto);
  } catch (error) {
    console.log(`Problema al actualizar libro con id ${req.params.idUsuario}`);
    manejoMensajes(error, res);
  }
};


