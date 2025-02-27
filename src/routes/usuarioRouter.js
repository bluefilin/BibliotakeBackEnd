import { Router } from "express";
import { cambioContrasena, crearUsuario, getUsuarios,  } from "../controllers/usuarioController.js";
import { cargarImagenPerfil, getAvatarPerfil } from "../controllers/documentoController.js";
import { login } from "../controllers/loginController.js";
import cargarImagenesMiddleware from "../middleware/cargarImagenes.js";
const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/usuarios", cargarImagenesMiddleware, crearUsuario);

router.post("/cambioContrasena", cambioContrasena);

router.post("/login", login);
router.put('/usuarios/:id/avatar', cargarImagenesMiddleware, cargarImagenPerfil);
router.get('/usuarios/perfil/:id', getAvatarPerfil)

export default router;
