import { DbCreateMovieUseCase } from "@/data/useCases/createMovie/DbCreateMovieUseCase";
import { DbListAllMoviesUseCase } from "@/data/useCases/listMovies/DbListAllMoviesUseCase";
import { MovieRepository } from "@/infra/database/mongodb/repositories/MovieRepository";
import { CreateMovieController } from "@/presentation/controller/CreateMovieController";
import { ListAllMoviesController } from "@/presentation/controller/ListAllMoviesController";

export const makeCreateMovieUseCase = (): DbCreateMovieUseCase => {
  const movieRepository = new MovieRepository();

  const createMovieUseCase = new DbCreateMovieUseCase(
    movieRepository,
    movieRepository
  );

  return createMovieUseCase;
};

export const makeCreatePodcastController = (): CreateMovieController => {
  const createPodcastController = new CreateMovieController(
    makeCreateMovieUseCase()
  );

  return createPodcastController;
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