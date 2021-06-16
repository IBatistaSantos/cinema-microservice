  
import { Movie} from '@/domain/entities/Movie';

 type ListPodcastsParams = {
  page: number;
  limit: number;
};

 interface IListAllMoviesUseCase {
  listAll({page, limit}: ListPodcastsParams): Promise<Movie[]>;
}


export {IListAllMoviesUseCase, ListPodcastsParams}