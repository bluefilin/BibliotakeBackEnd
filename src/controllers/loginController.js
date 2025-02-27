import {
  loginServicio,
} from "../services/loginService.js";
import { manejoMensajes } from "../util/manejoMensajes.handle.js";

export const login = async (req, res) => {
  try {
    const {correo, contrasenia} = req.body;
    if (correo === "") {
      return res.status(400).send({error:400, mensaje:"El correo está vacío"})
    }
    if (contrasenia === "") {
      return res.status(400).send({error:400, mensaje:"La contraseña está vacía"})
    }
    
    const resp = await loginServicio(correo, contrasenia);
    if (resp == "204") {
      console.log(`Usuario ingreso correo ${correo} no se logueo exitosamente`)
      return res.status(404).send({error:404, mensaje:"El correo o contraseña no son correctos"})
    }
    return res.status(200).send(resp);
  } catch (error) {
    console.log("Error a la hora de loguear")
    manejoMensajes(error, res);
  }
};



