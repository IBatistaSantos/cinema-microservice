import { Router } from "express";
import { moviePremieresRouter } from "./movie.premieres.routes";
import { movieRouter } from "./movie.routes";

const routes = Router();
routes.use("/movies", movieRouter);
routes.use("/movies/premieres", moviePremieresRouter)
export { routes };
