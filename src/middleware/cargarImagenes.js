import multer from "multer";
import { join } from "path";
import { __dirname } from "../util/urlHandle.js";

const memoryStorage = multer.memoryStorage();

const cargarImagenesMiddleware = multer({
    limits: { fileSize: 20000000 },
    storage: memoryStorage,
    filename: (req, file, cb) => {
      cb(null, nombreArchivo);
    },
  }).single("archivo");

export default cargarImagenesMiddleware