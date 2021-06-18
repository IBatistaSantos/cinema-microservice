import { Movie } from '@/domain/entities/Movie';
import { IListMoviesPremieresUseCase } from '@/domain/useCases/listMovies/IListMoviesPremieresUseCase';
import { ListMoviePremieresController } from '@/presentation/controller/ListMoviePremieresController';
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

const mockListMoviesPremieresUseCase = (): IListMoviesPremieresUseCase => {
  class ListMoviesUseCaseStub implements IListMoviesPremieresUseCase {
   async listPremieres(): Promise<Movie[]> {
    return [mockMovie()];
   }
  }

  return new ListMoviesUseCaseStub();
};

describe('ListMoviesPremieresController Tests', () => {
  let listMoviesPremieresController: ListMoviePremieresController;
  let listMoviesPremieresUseCaseStub: IListMoviesPremieresUseCase;

  beforeEach(() => {
    listMoviesPremieresUseCaseStub = mockListMoviesPremieresUseCase();
    listMoviesPremieresController = new ListMoviePremieresController(
      listMoviesPremieresUseCaseStub
    );
  });

  it('should call DbListAllMoviesUseCase with correct values', async () => {
    const listSpy = jest.spyOn(listMoviesPremieresUseCaseStub, "listPremieres");

    await listMoviesPremieresController.handle({});

    expect(listSpy).toHaveBeenCalled();
  });

  it('should return internalServerError when DbListAllMviesUseCase throws', async () => {
    jest
      .spyOn(listMoviesPremieresUseCaseStub, 'listPremieres')
      .mockRejectedValueOnce(new Error());

    const result = await listMoviesPremieresController.handle({});

    expect(result).toEqual(internalServerError());
  });

  it('should return ok with movies on success', async () => {
    const result = await listMoviesPremieresController.handle({});
    expect(result).toEqual(ok([mockMovie()]));
  });
});