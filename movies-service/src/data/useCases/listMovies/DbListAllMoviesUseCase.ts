import { ILoadAllMovieRepository } from "@/data/protocols/db/ILoadAllMoviesRepository";
import { Movie } from "@/domain/entities/Movie";
import { IListAllMoviesUseCase } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";

class DbListAllMoviesUseCase implements IListAllMoviesUseCase {
  constructor(private readonly loadAllMoviesRepository: ILoadAllMovieRepository ) {}
  
  async listAll(): Promise<Movie[]> {
    const movies = await this.loadAllMoviesRepository.loadAll();
    return movies;
  }
}

export {DbListAllMoviesUseCase}