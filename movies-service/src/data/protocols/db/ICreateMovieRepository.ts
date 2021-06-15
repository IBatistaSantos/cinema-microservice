import { Movie } from '@/domain/entities/Movie';
import { CreateMovieParams } from '@/domain/useCases/createMovies/ICreateMovieUseCase';

 interface ICreateMovieRepository {
  create({name, duration, sinopsis, release_date, categories}: CreateMovieParams): Promise<Movie>;
}

export {ICreateMovieRepository}