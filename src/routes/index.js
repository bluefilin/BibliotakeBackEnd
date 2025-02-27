

import usuarioRoutes from "./usuarioRouter.js";
import libroRoutes from "./libroRouter.js";
import alquiladosRouter from "./alquiladosRouter.js";
const routesApi = (app) => {

  const routes = [usuarioRoutes, libroRoutes, alquiladosRouter]
  routes.forEach(ruta => {
    app.use("/api", ruta);
  })

  app.get("/load", (req, resp) => {
    resp.send("Api Loading");
  });
};

export { routesApi };
