import { DbCreateMovieUseCase } from "@/data/useCases/createMovie/DbCreateMovieUseCase";
import { DbListAllMoviesUseCase } from "@/data/useCases/listMovies/DbListAllMoviesUseCase";
import { DbListMovieByIdUseCase } from "@/data/useCases/listMovies/DbListMovieByIdUseCase";
import { DbListPremieresUseCase } from "@/data/useCases/listMovies/DbListMoviePremieresUseCase";
import { MovieRepository } from "@/infra/database/mongodb/repositories/MovieRepository";
import { CreateMovieController } from "@/presentation/controller/CreateMovieController";
import { ListAllMoviesController } from "@/presentation/controller/ListAllMoviesController";
import { ListMovieByIdController } from "@/presentation/controller/ListMovieByIdController";
import { ListMoviePremieresController } from "@/presentation/controller/ListMoviePremieresController";

export const makeCreateMovieUseCase = (): DbCreateMovieUseCase => {
  const movieRepository = new MovieRepository();

  const createMovieUseCase = new DbCreateMovieUseCase(
    movieRepository,
    movieRepository
  );

  return createMovieUseCase;
};

export const makeCreateMovieController = (): CreateMovieController => {
  const createMovieController = new CreateMovieController(
    makeCreateMovieUseCase()
  );

  return createMovieController;
};

export const makeListAllMovieUseCase = (): DbListAllMoviesUseCase => {
  const movieRepository = new MovieRepository();
  const listAllMoviesUseCase = new DbListAllMoviesUseCase(movieRepository);
  return listAllMoviesUseCase;
}

export const makeListAllMoviesController = () : ListAllMoviesController => {
  const listAllMoviesController = new ListAllMoviesController(makeListAllMovieUseCase());
  return listAllMoviesController;
}

export const makeListMovieByIdUseCase = (): DbListMovieByIdUseCase => {
  const movieRepository = new MovieRepository();
  const listMovieByIdUseCase = new DbListMovieByIdUseCase(movieRepository)
  return listMovieByIdUseCase;
}
export const makeListMovieByIdController = (): ListMovieByIdController => {
  const listMovieByIdController = new ListMovieByIdController(makeListMovieByIdUseCase());
  return listMovieByIdController;
}

export const makeListMoviePremieresController = () : ListMoviePremieresController => {
  const listMoviePremieresController = new ListMoviePremieresController(makeListMoviePremieresUseCase());
  return listMoviePremieresController
} 

export const makeListMoviePremieresUseCase = () : DbListPremieresUseCase => {
  const movieRepository = new MovieRepository();
  const listMoviePremieresUseCase = new DbListPremieresUseCase(movieRepository);
  return listMoviePremieresUseCase
}