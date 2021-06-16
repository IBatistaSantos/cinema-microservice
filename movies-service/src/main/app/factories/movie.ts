import { DbCreateMovieUseCase } from "@/data/useCases/createMovie/DbCreateMovieUseCase";
import { MovieRepository } from "@/infra/database/mongodb/repositories/MovieRepository";
import { CreateMovieController } from "@/presentation/controller/CreateMovieController";

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