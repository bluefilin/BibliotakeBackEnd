import { usuarioModel } from "../models/usuarioModel.js";
import { encriptarContrasena, verificarClave } from "../util/bcript.js";
import mongoose from 'mongoose';

const getUsuariosServicio = async () => {
  const usuarios = await usuarioModel.find(
    {},
    {
      nombres: 1,
      apellidos: 1,
      correo: 1,
      cargo: 1,
      foto: 1,
      id: 1,
      grupo: 1,
    }
  );
  return usuarios;
};

const crearUsuarioServicio = async (usuario, nombreAvatar) => {
  const usuarioexiste = await usuarioExisteServicio(usuario.correo);
  if (usuarioexiste) {
    return "400";
  }
  const clave = await encriptarContrasena(usuario.contrasena);
  usuario.contrasenia = clave;
  usuario.foto = nombreAvatar;
  const nuevoUsuario = new usuarioModel(usuario)
  nuevoUsuario.save();
  return nuevoUsuario;
};

const obtenerUsuariosArregloServicio = async (usuarios) => {
  let informacionUsuario = [];
  for (let index = 0; index < usuarios.length; index++) {
    const usuario = await consultarUsuarioId(usuarios[index]);
    informacionUsuario.push(usuario);
  }
  return informacionUsuario;
};

export const obtenerUsuariosActividad = async (usuarios) => {
  let informacionUsuario = [];
  for (let usuario of usuarios) {
    let usuarioDB = await consultarUsuarioId(mongoose.Types.ObjectId(usuario.id), { nombres: 1, apellidos: 1, foto: 1, correo: 1 });
    usuarioDB.puntos = usuario.puntos;
    informacionUsuario.push(usuarioDB);
  }
  return informacionUsuario;
}

const actualizarFotoServicio = async (id, nombreFoto) => {
  const usuario = await usuarioModel.updateOne(
    {
      _id: id,
    },
    {
      foto: nombreFoto,
    }
  );
  return usuario;
};

const usuarioExisteServicio = async (correo) => {
  const usuario = await usuarioModel.findOne({ correo });
  if (usuario == null) {
    return false;
  }
  return true;
};

const cambioContrasenaServicio = async (usuario) => {
  const busquedaUsuario = await usuarioModel.findOne({
    correo: usuario.correo,
  });
  if (busquedaUsuario == null) {
    return "460"; //Usuario no existe
  } else {
    const comparacionClave = await verificarClave(
      usuario.contrasenia,
      busquedaUsuario.contrasenia
    );
    if (!comparacionClave) {
      return "470";
    } else {
      const clave = await encriptarContrasena(usuario.nueva);
      await usuarioModel.updateOne(
        { correo: usuario.correo },
        {
          contrasenia: clave,
        }
      );
      return "230";
    }
  }
};

const getUsuarioComiteServicio = async (grupo) => {
  const grupoUsuarios = await usuarioModel.find(
    { grupo: grupo },
    {
      nombres: 1,
      apellidos: 1,
      cargo: 1,
      grupo: 1,
      foto: 1,
    }
  );
  return grupoUsuarios;
};

const consultarUsuarioId = async (id, filtter = { contrasenia: 0, insertDate: 0 }) => {
  const usuario = await usuarioModel.findById(id, filtter);
  return usuario;
};

export const consultarUsuarios = async (filtroBusqueda, filtroResultado = {}) => {
  const usuarios = await usuarioModel.find(filtroBusqueda, filtroResultado);
  return usuarios;
}

const consultarFoto = async (id) => {
  const usuarioFoto = await usuarioModel.findById(id, { foto: 1 });
  if (usuarioFoto.foto != "") {
    console.log(usuarioFoto);
    return usuarioFoto.foto;
  }
  return false;
};

export const obtenerFotoPerfilServicio = async (id) => {
  const usuario = await usuarioModel.findOne({ _id: id }, { _id: 0, foto: 1 });
  return usuario.foto;
}
export const buscarIdPorCorreoServicio = async (correo) => {
  const usuario = await usuarioModel.findOne({ correo }, { _id: 1 });
  return usuario ? usuario._id : null;
};

export {
  getUsuariosServicio,
  crearUsuarioServicio,
  cambioContrasenaServicio,
  getUsuarioComiteServicio,
  consultarUsuarioId,
  actualizarFotoServicio,
  consultarFoto,
  obtenerUsuariosArregloServicio,
};
