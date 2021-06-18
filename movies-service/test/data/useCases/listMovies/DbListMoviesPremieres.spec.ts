

import { ILoadAllMovieRepository } from '@/data/protocols/db/ILoadAllMoviesRepository';
import { ILoadMoviePremieresRepository } from '@/data/protocols/db/ILoadMoviePremieresRepository';
import { DbListAllMoviesUseCase } from '@/data/useCases/listMovies/DbListAllMoviesUseCase';
import { DbListPremieresUseCase } from '@/data/useCases/listMovies/DbListMoviePremieresUseCase';
import {Movie } from '@/domain/entities/Movie';

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date("2020-06-16"),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockLoadMoviesPremieresRepository = () => {
  class LoadMoviesPremieresRepositoryStub implements ILoadMoviePremieresRepository {
   async loadPremieres(): Promise<Movie[]> {
      return [mockMovie()]
    }
  }

  return new LoadMoviesPremieresRepositoryStub();
};

describe('DbListMoviesPremieresUseCase Tests', () => {
  let dbListMoviesPremieresUseCase: DbListPremieresUseCase;
  let loadMoviesPremieresRepository: ILoadMoviePremieresRepository;

  beforeEach(() => {
    loadMoviesPremieresRepository = mockLoadMoviesPremieresRepository();
    dbListMoviesPremieresUseCase = new DbListPremieresUseCase(loadMoviesPremieresRepository);
  });

  it('should call LoadAllMoviesRepository', async () => {
    const findSpy = jest.spyOn(loadMoviesPremieresRepository, 'loadPremieres');

    await loadMoviesPremieresRepository.loadPremieres();

    expect(findSpy).toHaveBeenCalled();
  });

  it('should throw if LoadAllMoviesRepository throws', async () => {
    jest
      .spyOn(loadMoviesPremieresRepository, 'loadPremieres')
      .mockRejectedValueOnce(new Error());

    await expect(dbListMoviesPremieresUseCase.listPremieres).rejects.toThrow();
  });

  it('should return movie list on success', async () => {
    const response = await dbListMoviesPremieresUseCase.listPremieres();
    expect(response).toEqual([mockMovie()]);
  });
});