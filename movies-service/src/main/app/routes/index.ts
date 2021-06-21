import { Router } from "express";
import { movieRouter } from "./movie.routes";

const routes = Router();
routes.use("/movies", movieRouter);
export { routes };
