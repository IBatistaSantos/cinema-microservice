import { ILoadAllMovieRepository } from '@/data/protocols/db/ILoadAllMoviesRepository';
import { DbListAllMoviesUseCase } from '@/data/useCases/listMovies/DbListAllMoviesUseCase';
import {Movie } from '@/domain/entities/Movie';

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date("2020-06-16"),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockLoadAllMovieRepository = () => {
  class LoadAllMoviesRepositoryStub implements ILoadAllMovieRepository {
    async loadAll(): Promise<Movie[]> {
      return [mockMovie()];
    }
  }

  return new LoadAllMoviesRepositoryStub();
};

describe('DbListAllMoviesUseCase Tests', () => {
  let dbListAllMoviesUseCase: DbListAllMoviesUseCase;
  let loadAllMoviesRepository: ILoadAllMovieRepository;

  beforeEach(() => {
    loadAllMoviesRepository = mockLoadAllMovieRepository();
    dbListAllMoviesUseCase = new DbListAllMoviesUseCase(loadAllMoviesRepository);
  });

  it('should call LoadAllMoviesRepository', async () => {
    const findSpy = jest.spyOn(loadAllMoviesRepository, 'loadAll');

    await dbListAllMoviesUseCase.listAll();

    expect(findSpy).toHaveBeenCalled();
  });

  it('should throw if LoadAllMoviesRepository throws', async () => {
    jest
      .spyOn(loadAllMoviesRepository, 'loadAll')
      .mockRejectedValueOnce(new Error());

    await expect(dbListAllMoviesUseCase.listAll()).rejects.toThrow();
  });

  it('should return movie list on success', async () => {
    const response = await dbListAllMoviesUseCase.listAll();
    expect(response).toEqual([mockMovie()]);
  });
});