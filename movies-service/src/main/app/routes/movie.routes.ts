import { Router } from "express";

import {} from "../"
import { adapterRoute } from "../adapter/express/routes";
import { makeCreatePodcastController } from "../factories/movie";


const movieRouter = Router();

movieRouter.post("/", adapterRoute(makeCreatePodcastController()));

export {movieRouter}