  
import { Movie} from '@/domain/entities/Movie';



 interface IListAllMoviesUseCase {
  listAll(): Promise<Movie[]>;
}


export { IListAllMoviesUseCase }