import { ILoadMoviePremieresRepository } from "@/data/protocols/db/ILoadMoviePremieresRepository";
import { Movie } from "@/domain/entities/Movie";
import { IListMoviesPremieresUseCase } from "@/domain/useCases/listMovies/IListMoviesPremieresUseCase";


class DbListPremieresUseCase implements IListMoviesPremieresUseCase {
  constructor(private readonly loadMoviePremieresRepository: ILoadMoviePremieresRepository) {}
  async listPremieres(): Promise<Movie[]> {
   const movies = await this.loadMoviePremieresRepository.loadPremieres();
    return movies;
  }
}

export { DbListPremieresUseCase }