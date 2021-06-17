import { MovieNotFoundError } from "@/data/errors/MovieNotFoundError";
import { ILoadMovieByIdRepository } from "@/data/protocols/db/ILoadMovieByIdRepository";
import { Movie } from "@/domain/entities/Movie";
import { IListMovieByIdUseCase } from "@/domain/useCases/listMovies/IListMovieByIdUseCase";

class DbListMovieByIdUseCase implements IListMovieByIdUseCase{
  constructor(private readonly loadByIdRepository: ILoadMovieByIdRepository) {}
  async loadById(id: string): Promise<Movie | undefined> {
    const movie = await this.loadByIdRepository.listById(id);
  
    if(movie === undefined) {
      throw new MovieNotFoundError();
    }
    return movie
  }
}


export {DbListMovieByIdUseCase}