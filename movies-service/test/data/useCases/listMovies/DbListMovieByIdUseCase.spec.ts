import { MovieNotFoundError } from '@/data/errors/MovieNotFoundError';
import { ILoadMovieByIdRepository } from '@/data/protocols/db/ILoadMovieByIdRepository';
import { DbListMovieByIdUseCase } from '@/data/useCases/listMovies/DbListMovieByIdUseCase';
import {Movie } from '@/domain/entities/Movie';

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date("2020-06-16"),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockLoadByIdMovieRepository = () => {
  class LoadMovieByIdRepositoryStub implements ILoadMovieByIdRepository {
    async listById(id: string): Promise<Movie | undefined> {
     return mockMovie();
    }
  }
  return new LoadMovieByIdRepositoryStub();
};

describe('DbListMovieByIdUseCase Tests', () => {
  let dbListMovieByIdUseCase: DbListMovieByIdUseCase;
  let loadMovieByIdRepository: ILoadMovieByIdRepository;

  beforeEach(() => {
    loadMovieByIdRepository = mockLoadByIdMovieRepository();
    dbListMovieByIdUseCase = new DbListMovieByIdUseCase(loadMovieByIdRepository);
  });

  it('should call LoadMovieByIdRepository', async () => {
    const findSpy = jest.spyOn(loadMovieByIdRepository, 'listById');
    const id = "anyId";
    await dbListMovieByIdUseCase.loadById(id);
    expect(findSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if LoadMovieByIdRepository throws', async () => {
    jest
      .spyOn(loadMovieByIdRepository, 'listById')
      .mockRejectedValueOnce(new Error());

    await expect(dbListMovieByIdUseCase.loadById("anyId")).rejects.toThrow();
  });
  
  it('should return movie on success', async () => {
    const response = await dbListMovieByIdUseCase.loadById("id");
    expect(response).toEqual(mockMovie());
  }); 

  it('should throw if LoadMovieByIdRepository not finds one', async () => {
    jest
      .spyOn(loadMovieByIdRepository, 'listById')
      .mockResolvedValueOnce(undefined);

    await expect(dbListMovieByIdUseCase.loadById("anyId")).rejects.toBeInstanceOf(
      MovieNotFoundError
    );
  });
});