import { libroModel } from "../models/libroModel.js";
import { usuarioModel } from "../models/usuarioModel.js";
import { alquiladosModel } from "../models/alquiladosModel.js"
export const alquilarLibroServicio = async (idUsuario, idLibro, fechaDevolucion) => {
    try {
      const usuarioExistente = await usuarioModel.findById(idUsuario);
      if (!usuarioExistente) {
        return { mensaje: "El usuario no existe" };
      }
  
      const libro = await libroModel.findById(idLibro);
      if (libro.disponibles > 0) {
        const alquiler = await alquiladosModel.create({ idUsuario, idLibro, fechaDevolucion, estado: "Alquilado" });
        const idAlquiler = alquiler._id;
        await usuarioModel.findByIdAndUpdate(idUsuario, { $push: { alquileres: idAlquiler } });
        await libroModel.findByIdAndUpdate(idLibro, { $push: { alquileres: idAlquiler } });
        await libroModel.findByIdAndUpdate(idLibro, { $inc: { disponibles: -1 } });
  
        return { mensaje: "Libro alquilado con éxito" };
      } else {
        return { mensaje: "No hay libros disponibles para alquilar" };
      }
    } catch (error) {
      throw error;
    }
  };
  export const obtenerAlquilerUsuarioIdServicio = async (idUsuario) => {
    const alquiler = await alquiladosModel.find({ idUsuario })
    .populate("idUsuario")
    .populate("idLibro");
    return alquiler;
  };


  export const actualizarAlquilerServicio = async (id, Alquiler) => {
    try {
      const alquilerActual = await alquiladosModel.findById(id);
      if (!alquilerActual) {
        return { mensaje: "Alquiler no encontrado" };
      }

      if (alquilerActual.estado !== "devuelto") {

        const nuevoEstado = Alquiler.estado;
        alquilerActual.estado = nuevoEstado;
        await alquilerActual.save();
  
        if (nuevoEstado === "devuelto") {
          const idLibro = alquilerActual.idLibro;
          const libro = await libroModel.findById(idLibro);
          if (libro) {
            await libroModel.findByIdAndUpdate(idLibro, { $inc: { disponibles: 1 } });
          }
        }
  
        return { mensaje: "Alquiler actualizado con éxito" };
      } else {
        return { mensaje: "No se puede actualizar un alquiler devuelto" };
      }
    } catch (error) {
      throw error;
    }
  };
  export const obtenerAlquilerIdServicio = async (id) => {
    const Libro = await alquiladosModel
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