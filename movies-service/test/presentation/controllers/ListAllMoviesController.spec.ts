import { Movie } from '@/domain/entities/Movie';
import { IListAllMoviesUseCase, ListPodcastsParams } from '@/domain/useCases/listMovies/IListAllMoviesUseCase';
import { ListAllMoviesController } from '@/presentation/controller/ListAllMoviesController';
import {
  internalServerError,
  ok,
  Request,
} from '@/presentation/protocols/Http';

const mockRequest = (): Request => ({
  query: {
    page: '1',
    limit: '10',
  },
});

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
   async  listAll({ page, limit }: ListPodcastsParams): Promise<Movie[]> {
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

    const request = mockRequest();

    await listAllMoviesController.handle(request);

    expect(listSpy).toHaveBeenCalledWith({
      page:  Number(request.query.page),
      limit: Number(request.query.limit),
    });
  });

  it('should return internalServerError when DbListAllMviesUseCase throws', async () => {
    jest
      .spyOn(listAllMoviesUseCaseStub, 'listAll')
      .mockRejectedValueOnce(new Error());

    const request = mockRequest();

    const result = await listAllMoviesController.handle(request);

    expect(result).toEqual(internalServerError());
  });

  it('should return ok with movies on success', async () => {
    const request = mockRequest();

    const result = await listAllMoviesController.handle(request);

    expect(result).toEqual(ok([mockMovie()]));
  });
});