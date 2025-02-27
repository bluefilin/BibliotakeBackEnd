import dotenv from "dotenv";
import { resolve } from "path";
import { __dirname } from "../util/urlHandle.js";

dotenv.config();
dotenv.config({
  path: resolve(__dirname, `config/.env.${process.env.NODE_ENV}`),
});
import { usuarioModel } from "../models/usuarioModel.js";
import { encriptarContrasena, verificarClave } from "../util/bcript.js";
import {
  generarTokenTemporal,
  generarToken,
  verificarToken,
} from "../util/jwt.js";
export const loginServicio = async (email, clave) => {
  const usuario = await usuarioModel.findOne({
    correo: email,
  });
  if (!usuario) return "204";
  const validacionClave = await verificarClave(clave, usuario.contrasenia);
  if (!validacionClave) return "204";

  const token = generarToken();
  const data = {
    id: usuario.id,
    nombre: usuario.nombres,
    apellido: usuario.apellidos,
    cargo: usuario.cargo,
    grupo: usuario.grupo,
    correo: usuario.correo,
    foto: usuario.foto,
    token,
  };
  return data;
};




export const cambioContrasenaServicio = async (id, token) => {
  try {
    console.log(id);
    console.log(token);
    const verificacionToken = verificarToken(token);
    if (!verificacionToken) return false;
    const usuario = await usuarioModel.findOne({ _id: id }, {});
    if (usuario == null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const cambioContrasenaActualServicio = async (usuario) => {
  const busquedaUsuario = await usuarioModel.findById(usuario.id);
  if (busquedaUsuario == null) {
    return "204";
  }
  try {
    const claveEncriptada = await encriptarContrasena(usuario.contrasenia);
    const usuarioActualizado = await usuarioModel.updateOne(
      { correo: busquedaUsuario.correo },
      { contrasenia: claveEncriptada }
    );
    return usuarioActualizado;
  } catch (error) {
    return "422";
  }
};