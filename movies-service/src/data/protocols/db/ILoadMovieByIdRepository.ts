import { Movie } from "@/domain/entities/Movie";

interface ILoadMovieByIdRepository {
  listById(id: string): Promise<Movie | undefined>
}

export { ILoadMovieByIdRepository}