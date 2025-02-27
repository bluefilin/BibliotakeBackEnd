import Express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { resolve } from "path";
import { routesApi } from "./routes/index.js";
import dbConnection from "./databases/database-config.js";
import { __dirname } from "./util/urlHandle.js";

import bodyParser from "body-parser";

dotenv.config();
dotenv.config({
  path: resolve(__dirname, `config/.env.${process.env.NODE_ENV}`),
});
const app = Express();
const PORT = process.env.PORT || 3200;
const HOST = process.env.HOST || "http://localhost:3300/";
const publicaPath = resolve(__dirname, "./public");

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());
app.use(Express.static(publicaPath));

routesApi(app);
dbConnection();

app.listen(PORT, () => console.log(`Server run in port ${PORT} 💥`));
