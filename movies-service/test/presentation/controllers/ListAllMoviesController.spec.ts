import { Movie } from '@/domain/entities/Movie';
import { IListAllMoviesUseCase } from '@/domain/useCases/listMovies/IListAllMoviesUseCase';
import { ListAllMoviesController } from '@/presentation/controller/ListAllMoviesController';
import {
  internalServerError,
  ok,
} from '@/presentation/protocols/Http';


const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date("2020-06-16"),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockListAllMoviesUseCase = (): IListAllMoviesUseCase => {
  class ListMoviesUseCaseStub implements IListAllMoviesUseCase {
   async  listAll(): Promise<Movie[]> {
      return [mockMovie()];
    }
  }

  return new ListMoviesUseCaseStub();
};

describe('ListPodcastsController Tests', () => {
  let listAllMoviesController: ListAllMoviesController;
  let listAllMoviesUseCaseStub: IListAllMoviesUseCase;

  beforeEach(() => {
    listAllMoviesUseCaseStub = mockListAllMoviesUseCase();
    listAllMoviesController = new ListAllMoviesController(
      listAllMoviesUseCaseStub
    );
  });

  it('should call DbListAllMoviesUseCase with correct values', async () => {
    const listSpy = jest.spyOn(listAllMoviesUseCaseStub, 'listAll');

    await listAllMoviesController.handle({});

    expect(listSpy).toHaveBeenCalled();
  });

  it('should return internalServerError when DbListAllMviesUseCase throws', async () => {
    jest
      .spyOn(listAllMoviesUseCaseStub, 'listAll')
      .mockRejectedValueOnce(new Error());

    const result = await listAllMoviesController.handle({});

    expect(result).toEqual(internalServerError());
  });

  it('should return ok with movies on success', async () => {
    const result = await listAllMoviesController.handle({});
    expect(result).toEqual(ok([mockMovie()]));
  });
});