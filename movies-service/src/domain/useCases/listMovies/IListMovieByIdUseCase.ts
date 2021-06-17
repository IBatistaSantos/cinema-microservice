  
import { Movie} from '@/domain/entities/Movie';

interface IListMovieByIdUseCase {
 loadById(id: string): Promise<Movie | undefined>;
}

export {IListMovieByIdUseCase }