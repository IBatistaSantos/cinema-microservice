import { Movie } from '@/domain/entities/Movie';

 type CreateMovieParams = {
  name: string;
  sinopsis: string;
  duration: number;
  release_date: Date;
  categories: string[]
};

 interface ICreateMovieUseCase {
  create(data: CreateMovieParams): Promise<Movie>;
}

export {ICreateMovieUseCase, CreateMovieParams}