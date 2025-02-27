// import { estadoModel } from "../models/estadoModel.js";
import { libroModel } from "../models/libroModel.js";
import { usuarioModel } from "../models/usuarioModel.js";
import { alquiladosModel } from "../models/alquiladosModel.js"
// import { consultarUsuarioId } from "./usuarioService.js";
// import { enviarCorreo } from "./emailServicio.js";
// import { usuarioModel } from "../models/usuarioModel.js";
// import { getUsuariosServicio } from "./usuarioService.js";
// import mongoose from "mongoose";
// import { formatearFecha } from "../util/validation.js";

export const publicarLibroServicio = async (data, nombreArchivo) => {
  console.log(data);
  console.log(nombreArchivo);
  const libro = {
    titulo: data.titulo,
    autor: data.autor,
    genero: data.genero,
    sinopsis: data.sinopsis,
    disponibles: data.disponibles,
    foto : nombreArchivo
  };
  const nuevoLibro = await libroModel.create(libro);
  return nuevoLibro;
};

export const obtenerLibrosServicio = async () => {
  const Retos = await libroModel
    .find()
  return Retos;
};

export const obtenerLibroIdServicio = async (id) => {
  const Libro = await libroModel
    .findById(id)
  //   .populate("autor")
  //   .populate("estado")
  //   .populate("tipo_innovacion")
  //   .populate("foco");
  // let desafiados, coautores, visualizadores;
  // if (Reto.desafiados != null || Reto.desafiados != undefined) {
  //   desafiados = await buscarDesafiados(Reto.desafiados);
  //   Reto.desafiados = desafiados;
  // }

  // if (Reto.coAutor != null || Reto.coAutor != undefined) {
  //   coautores = await buscarCoautores(Reto.coAutor);
  //   Reto.coAutor = coautores;
  // }
  // if (Reto.visualizadores != null || Reto.visualizadores != undefined) {
  //   visualizadores = await buscarvisualizadores(Reto.visualizadores);
  //   Reto.visualizadores = visualizadores;
  // }
  return Libro;
};

export const actualizarLibroServicio = async (id, Libro) => {
  const RetoActualizada = await libroModel.findByIdAndUpdate(id, Libro);
  return RetoActualizada;
};
