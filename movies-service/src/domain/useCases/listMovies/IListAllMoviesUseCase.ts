  
import { Movie} from '@/domain/entities/Movie';

 type ListPodcastsParams = {
  page: number;
  limit: number;
};

 interface IListAllMoviesUseCase {
  listAll(): Promise<Movie[]>;
}


export {IListAllMoviesUseCase, ListPodcastsParams}