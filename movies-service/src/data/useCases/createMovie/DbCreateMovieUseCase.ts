import { ILoadMovieByNameRepository } from "@/data/protocols/db/ILoadMovieByNameRepository";
import { Movie } from "@/domain/entities/Movie";
import { CreateMovieParams, ICreateMovieUseCase } from "@/domain/useCases/createMovies/ICreateMovieUseCase";
import {MovieAlreadyExistsError} from "@/data/errors/MovieAlredyExistsError";
import { ICreateMovieRepository } from "@/data/protocols/db/ICreateMovieRepository";

class DbCreateMovieUseCase implements ICreateMovieUseCase {
  constructor (
    private readonly loadMovieByNameRepository: ILoadMovieByNameRepository,
    private readonly createMovieRepository: ICreateMovieRepository,
    ) {}
 async  create({ name, sinopsis, duration, categories, release_date}: CreateMovieParams): Promise<Movie> {
   const findMovie = await this.loadMovieByNameRepository.loadByName(name);

   if(findMovie) {
     throw new MovieAlreadyExistsError();
   }

   const movie = await this.createMovieRepository.create({
    name,
    sinopsis,
    duration,
    release_date,
    categories,
   });

   return movie
  }
}

export {DbCreateMovieUseCase}