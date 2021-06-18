import { Movie } from "@/domain/entities/Movie";

interface ILoadAllMovieRepository {
  loadAll(): Promise<Movie[]>
}
export {ILoadAllMovieRepository}