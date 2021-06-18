import { Movie } from "@/domain/entities/Movie";

interface IListMoviesPremieresUseCase {
  listPremieres(): Promise<Movie[]>
}

export { IListMoviesPremieresUseCase }