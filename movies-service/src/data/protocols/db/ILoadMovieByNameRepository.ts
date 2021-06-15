import { Movie } from "@/domain/entities/Movie";

interface ILoadMovieByNameRepository {
  loadByName(name: string): Promise<Movie | undefined>
}
export {ILoadMovieByNameRepository}