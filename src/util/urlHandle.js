import { fileURLToPath } from "url";
import path, { join } from "path";

const __filename = fileURLToPath(join(import.meta.url, "../"));
const __dirname = path.dirname(__filename);

export { __dirname };
