import { Movie } from '@/domain/entities/Movie';

 type CreateMovieParams = {
  name: string;
  sinopsis: string;
  duration: number;
  image_url: string;
  release_date: Date;
  categories: string[]
};

 interface ICreatePodcastUseCase {
  create(data: CreateMovieParams): Promise<Movie>;
}

export {ICreatePodcastUseCase, CreateMovieParams}