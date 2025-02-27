import {eliminarAvatarAlmacenServicio, optimizarImagen} from "../services/documentoService.js";
import {cambioContrasenaServicio,crearUsuarioServicio,getUsuariosServicio} from "../services/usuarioService.js";
import { renombrarImagenes } from "../util/validation.js";
export const getUsuarios = async (req, res) => {
  try {
    const resp = await getUsuariosServicio();
    return res.status(200).send(resp);
  } catch (error) {
  }
};

export const crearUsuario = async (req, res) => {
  try {
    let nombreAvatar = null;

    if (req.file) {
      const imagenBuffer = req.file.buffer;
      console.log(imagenBuffer);
      nombreAvatar = renombrarImagenes(req.file.originalname);
      const image = await optimizarImagen(imagenBuffer, nombreAvatar);
    }

    const responseUsuario = await crearUsuarioServicio(req.body, nombreAvatar);
    
    if (responseUsuario === "400") {
      return res.status(400).send({error: 400, mensaje: "Este correo ya se encuentra registrado"});
    }

    return res.status(200).send(responseUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 500, mensaje: "Error interno del servidor"});
  }
};

export const cambioContrasena = async (req, res) => {
  try {
    const camContra = await cambioContrasenaServicio(req.body);
    return res.status(200).send(camContra);
  } catch (e) {
    console.log(e);
  }
};

export const getAvatarPerfil = async (req, res) => {
  const id = req.params.id;
  try {
    const foto = await obtenerFotoPerfilServicio(id);
    console.log(foto);
    const archivo = join(__dirname, `../public/avatar/${foto}`);
    if (existsSync(archivo)) {
      res.status(200).sendFile(archivo);
    } else {
      res.status(404).send({ "error": "", "msg": "Imagen No existe" })
    }
  } catch (error) {
    manejoMensajes(error, res);
  }
};