import { ILoadAllMovieRepository } from "@/data/protocols/db/ILoadAllMoviesRepository";
import { Movie } from "@/domain/entities/Movie";
import { IListAllMoviesUseCase, ListPodcastsParams } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";

class DbListAllMoviesUseCase implements IListAllMoviesUseCase {
  constructor(private readonly loadAllMoviesRepository: ILoadAllMovieRepository ) {}
  
  async listAll({ page, limit }: ListPodcastsParams): Promise<Movie[]> {
    const movies = await this.loadAllMoviesRepository.loadAll({
        page,
        limit,
      });
      return movies;
  }
}

export {DbListAllMoviesUseCase}