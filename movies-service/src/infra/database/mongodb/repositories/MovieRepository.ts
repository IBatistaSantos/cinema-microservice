import { ICreateMovieRepository } from "@/data/protocols/db/ICreateMovieRepository";
import { ILoadAllMovieRepository } from "@/data/protocols/db/ILoadAllMoviesRepository";
import { ILoadMovieByIdRepository } from "@/data/protocols/db/ILoadMovieByIdRepository";
import { ILoadMovieByNameRepository } from "@/data/protocols/db/ILoadMovieByNameRepository";
import { ILoadMoviePremieresRepository } from "@/data/protocols/db/ILoadMoviePremieresRepository";
import { Movie } from "@/domain/entities/Movie";
import { CreateMovieParams } from "@/domain/useCases/createMovies/ICreateMovieUseCase";
import { map, mapCollection } from "../helpers/mapper";
import { MovieSchema } from "../schemas/MovieSchema";


class MovieRepository implements ICreateMovieRepository, 
  ILoadMovieByNameRepository, 
  ILoadAllMovieRepository,
  ILoadMovieByIdRepository,
  ILoadMoviePremieresRepository
{

  async loadPremieres(): Promise<Movie[]> {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const movies = await MovieSchema.find({ release_date: { $gte: monthAgo}});
   return mapCollection<Movie>(movies)
  
  }
  
  async  listById(id: string): Promise<Movie | undefined> {
    const movie = await MovieSchema.findById(id);
    return movie ? map<Movie>(movie) : undefined;  
  }
  
 async loadAll(): Promise<Movie[]> {
    const movies = await MovieSchema.find();
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