import { Router } from "express";

import {} from "../"
import { adapterRoute } from "../adapter/express/routes";
import { makeCreatePodcastController, makeListAllMoviesController } from "../factories/movie";


const movieRouter = Router();

movieRouter.post("/", adapterRoute(makeCreatePodcastController()));
movieRouter.get("/", adapterRoute(makeListAllMoviesController()))
export {movieRouter}