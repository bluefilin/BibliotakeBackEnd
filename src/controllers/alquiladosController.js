import { alquilarLibroServicio, obtenerAlquilerUsuarioIdServicio, actualizarAlquilerServicio, obtenerAlquilerIdServicio } from "../services/alquiladosService.js";
import { manejoMensajes } from "../util/manejoMensajes.handle.js";

export const alquilarLibro = async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const idLibro = req.params.id; // Obtener el ID del libro de los parámetros de la ruta
    const fechaDevolucion = req.body.fechaDevolucion;
    // Lógica para alquilar el libro y actualizar las tablas
    const resultado = await alquilarLibroServicio(usuario, idLibro, fechaDevolucion);

    return res.status(200).send(resultado);
  } catch (error) {
    console.log("Error al alquilar el libro");
    manejoMensajes(error, res);
  }
};
export const alquileresUsuario = async (req, res) => {
  try {
    const alquileres = await obtenerAlquilerUsuarioIdServicio(req.params.id);

    if (!alquileres || alquileres.length === 0) {
      // Manejar el caso en el que no se encuentren alquileres para ese usuario
      return res.status(404).json({ mensaje: 'No se encontraron alquileres para este usuario' });
    }

    console.log(`Obtener alquileres para el usuario con ID ${req.params.id}`);
    res.status(200).json(alquileres);
  } catch (error) {
    console.log(`Error al obtener alquileres para el usuario con ID ${req.params.id}`);
    manejoMensajes(error, res);
  }
};
export const actualizarAlquiler = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const reto = await actualizarAlquilerServicio(id, req.body);
    console.log(`Actualizar alquiler con id ${req.params.id}`);
    res.status(200).json(reto);
  } catch (error) {
    console.log(`Problema al actualizar el alquiler con id ${req.params.idUsuario}`);
    manejoMensajes(error, res);
  }
};

export const obtenerAlquilerId = async (req, res) => {
  try {
    const reto = await obtenerAlquilerIdServicio(req.params.id);
    console.log(`Obtener reto con id ${req.params.id}`);
    res.status(200).json(reto);
  } catch (error) {
    console.log(`Error al obtener reto por id ${req.params.id}`);
    manejoMensajes(error, res);
  }
};