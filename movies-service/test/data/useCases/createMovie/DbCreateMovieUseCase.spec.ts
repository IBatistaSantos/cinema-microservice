import {  MovieAlreadyExistsError } from '@/data/errors/MovieAlredyExistsError';
import { ICreateMovieRepository } from '@/data/protocols/db/ICreateMovieRepository';
import { ILoadMovieByNameRepository } from '@/data/protocols/db/ILoadMovieByNameRepository';
import { DbCreateMovieUseCase } from '@/data/useCases/createMovie/DbCreateMovieUseCase';
import { Movie } from '@/domain/entities/Movie';
import { CreateMovieParams } from '@/domain/useCases/createMovies/ICreateMovieUseCase';

const mockCreateMovieParams = (): CreateMovieParams => ({
  name: 'anyname',
  duration: 145,
  release_date: new Date(),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockMovie = (): Movie => ({
  id: 'anyid',
  name: "anyName",
  duration: 145,
  release_date: new Date(),
  sinopsis: "anySinopsis",
  categories: ["anyCategory"]
});

const mockLoadMovieByNameRepository = () => {
  class LoadMovieByNameRepositoryStub
    implements ILoadMovieByNameRepository {
    async loadByName(name: string): Promise<Movie | undefined> {
     return undefined
    }
  }

  return new LoadMovieByNameRepositoryStub();
};

const mockCreateMovieRepository = () => {
  class CreateMovieRepositoryStub implements ICreateMovieRepository {
    async create(): Promise<Movie> {
      return mockMovie();
    }
  }

  return new CreateMovieRepositoryStub();
};

describe('DbCreateMovieUseCase Tests', () => {
  let createMovieUseCase: DbCreateMovieUseCase;
  let loadMovieByNameRepository: ILoadMovieByNameRepository;
  let createMovieRepository: ICreateMovieRepository;

  beforeEach(() => {
    loadMovieByNameRepository = mockLoadMovieByNameRepository();
    createMovieRepository = mockCreateMovieRepository();

    createMovieUseCase = new DbCreateMovieUseCase(
      loadMovieByNameRepository,
      createMovieRepository
    );
  });

  it('should call LoadMovieByNameRepository with correct values', async () => {
    const params = mockCreateMovieParams();

    const findSpy = jest.spyOn(loadMovieByNameRepository, 'loadByName');

    await createMovieUseCase.create(params);

    expect(findSpy).toHaveBeenCalledWith(params.name);
  });

  it('should throw if LoadMovieByNameRepository throws', async () => {
    const params = mockCreateMovieParams();

    jest
      .spyOn(loadMovieByNameRepository, 'loadByName')
      .mockRejectedValueOnce(new Error());

    await expect(createMovieUseCase.create(params)).rejects.toThrow();
  });

  it('should throw if LoadMovieByNameRepository finds one', async () => {
    const params = mockCreateMovieParams();

    jest
      .spyOn(loadMovieByNameRepository, 'loadByName')
      .mockResolvedValueOnce(mockMovie());

    await expect(createMovieUseCase.create(params)).rejects.toBeInstanceOf(
      MovieAlreadyExistsError
    );
  });

  it('should call CreateMovieRepository with correct values', async () => {
    const params = mockCreateMovieParams();

    const createSpy = jest.spyOn(createMovieRepository, 'create');

    await createMovieUseCase.create(params);

    expect(createSpy).toHaveBeenCalledWith(params);
  });

  it('should throw if CreateMovieRepository throws', async () => {
    const params = mockCreateMovieParams();

    jest
      .spyOn(createMovieRepository, 'create')
      .mockRejectedValueOnce(new Error());

    await expect(createMovieUseCase.create(params)).rejects.toThrow();
  });

  it('should return movie on success', async () => {
    const params = mockCreateMovieParams();

    const response = await createMovieUseCase.create(params);

    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
  });
});
