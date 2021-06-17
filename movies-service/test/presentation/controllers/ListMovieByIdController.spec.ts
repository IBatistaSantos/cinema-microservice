import { Movie } from '@/domain/entities/Movie';
import { IListMovieByIdUseCase } from '@/domain/useCases/listMovies/IListMovieByIdUseCase';
import { ListMovieByIdController } from '@/presentation/controller/ListMovieByIdController';
import {
  internalServerError,
  ok,
  Request,
} from '@/presentation/protocols/Http';

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date("2020-06-16"),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockListMovieByIdUseCase = (): IListMovieByIdUseCase => {
  class ListMoviesByIdUseCaseStub implements IListMovieByIdUseCase {
   async loadById(id: string): Promise<Movie | undefined> {
      return mockMovie();
   }
  }

  return new ListMoviesByIdUseCaseStub();
};

describe('ListMovieByIdController Tests', () => {
  let listMovieByIdController: ListMovieByIdController;
  let listMovieByIdUseCaseStub: IListMovieByIdUseCase;

  beforeEach(() => {
    listMovieByIdUseCaseStub = mockListMovieByIdUseCase();
    listMovieByIdController = new ListMovieByIdController(
      listMovieByIdUseCaseStub
    );
  });

   it('should return internalServerError when DbListAllMviesUseCase throws', async () => {
    const request: Request = {}
    jest
      .spyOn(listMovieByIdUseCaseStub, 'loadById')
      .mockRejectedValueOnce(new Error());

    const result = await listMovieByIdController.handle(request);
  
    expect(result).toEqual(internalServerError());
  });
});