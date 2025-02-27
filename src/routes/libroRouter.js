import { Router } from "express";
import {
  publicarLibro,
  obtenerLibros,
  obtenerLibroId,
  actualizarLibro,
} from "../controllers/libroController.js";
import cargarImagenesMiddleware from "../middleware/cargarImagenes.js";
import { getLibroImg } from "../controllers/documentoController.js";
const router = Router();

router.get("/libros", obtenerLibros);

router.get("/libro/:id", obtenerLibroId);
 
router.post("/libro", cargarImagenesMiddleware, publicarLibro);

router.put("/libro/:id", actualizarLibro);
router.get('/libros/:id/img', getLibroImg)

export default router;
