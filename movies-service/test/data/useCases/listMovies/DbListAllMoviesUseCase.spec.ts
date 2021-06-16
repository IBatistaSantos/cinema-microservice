import { ILoadAllMovieRepository } from '@/data/protocols/db/ILoadAllMoviesRepository';
import { DbListAllMoviesUseCase } from '@/data/useCases/listMovies/DbListAllMoviesUseCase';
import {Movie } from '@/domain/entities/Movie';
import { ListPodcastsParams } from '@/domain/useCases/listMovies/IListAllMoviesUseCase';

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date(),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockLoadAllMovieRepository = () => {
  class LoadAllMoviesRepositoryStub implements ILoadAllMovieRepository {
    async loadAll({ page, limit }: ListPodcastsParams): Promise<Movie[]> {
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

    const page = 1;
    const limit = 10;

    await dbListAllMoviesUseCase.listAll({ page, limit });

    expect(findSpy).toHaveBeenCalledWith({
      page,
      limit,
    });
  });

  it('should throw if LoadAllMoviesRepository throws', async () => {
    jest
      .spyOn(loadAllMoviesRepository, 'loadAll')
      .mockRejectedValueOnce(new Error());

    const page = 1;
    const limit = 10;

    await expect(dbListAllMoviesUseCase.listAll({ page, limit })).rejects.toThrow();
  });

  it('should return movie list on success', async () => {
    const page = 1;
    const limit = 10;

    const response = await dbListAllMoviesUseCase.listAll({ page, limit });

    expect(response).toEqual([mockMovie()]);
  });
});