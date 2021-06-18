import { Router } from "express";

import { adapterRoute } from "../adapter/express/routes";
import { makeListMoviePremieresController } from "../factories/movie";

const moviePremieresRouter = Router();
moviePremieresRouter.put("/", adapterRoute(makeListMoviePremieresController()));
export { moviePremieresRouter}