import { Router } from "express";

import {} from "../"
import { adapterRoute } from "../adapter/express/routes";
import { makeCreateMovieController, makeListAllMoviesController, makeListMovieByIdController } from "../factories/movie";


const movieRouter = Router();

movieRouter.post("/", adapterRoute(makeCreateMovieController()));
movieRouter.get("/", adapterRoute(makeListAllMoviesController()));
movieRouter.get("/:id", adapterRoute(makeListMovieByIdController()))
export { movieRouter }