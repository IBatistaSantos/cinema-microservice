import { Router } from "express";

import { adapterRoute } from "../adapter/express/routes";
import {
   makeCreateMovieController, 
  makeListAllMoviesController, 
  makeListMovieByIdController, 
  makeListMoviePremieresController } from "../factories/movie";

const movieRouter = Router();

movieRouter.post("/", adapterRoute(makeCreateMovieController()));
movieRouter.get("/", adapterRoute(makeListAllMoviesController()));
movieRouter.get("/premieres", adapterRoute(makeListMoviePremieresController()));
movieRouter.get("/:id", adapterRoute(makeListMovieByIdController()));
export { movieRouter }