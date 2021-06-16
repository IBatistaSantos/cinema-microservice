import { Movie } from "@/domain/entities/Movie";
import { ListPodcastsParams } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";

interface ILoadAllMovieRepository {
  listAll({page, limit}: ListPodcastsParams): Promise<Movie[]>
}
export {ILoadAllMovieRepository}