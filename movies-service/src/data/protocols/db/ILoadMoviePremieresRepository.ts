import { Movie } from "@/domain/entities/Movie";

interface ILoadMoviePremieresRepository {
  loadPremieres(): Promise<Movie[]>
}
export {ILoadMoviePremieresRepository}