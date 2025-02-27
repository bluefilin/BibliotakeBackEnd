import { Router } from "express";
import {alquilarLibro, alquileresUsuario, actualizarAlquiler, obtenerAlquilerId} from "../controllers/alquiladosController.js";

const router = Router();

router.post("/libro/:id/alquilar", alquilarLibro);
router.get("/alquiler/usuario/:id", alquileresUsuario);
router.get("/alquiler/:id", obtenerAlquilerId);
router.put('/alquiler/:id', actualizarAlquiler);

export default router;