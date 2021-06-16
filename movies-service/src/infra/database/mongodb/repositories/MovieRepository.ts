import { ICreateMovieRepository } from "@/data/protocols/db/ICreateMovieRepository";
import { ILoadMovieByNameRepository } from "@/data/protocols/db/ILoadMovieByNameRepository";
import { Movie } from "@/domain/entities/Movie";
import { CreateMovieParams } from "@/domain/useCases/createMovies/ICreateMovieUseCase";
import { IListAllMoviesUseCase, ListPodcastsParams } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";
import { map, mapCollection } from "../helpers/mapper";
import { MovieSchema } from "../schemas/MovieSchema";



class MovieRepository implements ICreateMovieRepository, ILoadMovieByNameRepository, IListAllMoviesUseCase {
 async  listAll({ page, limit }: ListPodcastsParams): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    
    const movies = await MovieSchema.find().skip(skip).limit(limit).sort({
      createdAt: -1,
    });

    return mapCollection<Movie>(movies);
  }
  
  async loadByName(name: string): Promise<Movie | undefined> {
    const movie = await MovieSchema.findOne({ name });
    return movie ? map<Movie>(movie) : undefined;
  }
  
  async create({ name, duration, sinopsis, release_date, categories }: CreateMovieParams): Promise<Movie> {
    const movie = await MovieSchema.create({ name, duration, sinopsis, release_date, categories});
    return map<Movie>(movie); 
  }
}

export {MovieRepository}