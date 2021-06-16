import { MovieAlreadyExistsError } from '@/data/errors/MovieAlredyExistsError';
import { Movie } from '@/domain/entities/Movie';
import { ICreateMovieUseCase } from '@/domain/useCases/createMovies/ICreateMovieUseCase';
import { CreateMovieController } from '@/presentation/controller/CreateMovieController';
import {
  badRequest,
  created,
  internalServerError,
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

const mockCreateMovieUseCase = () => {
  class CreateMovieUseCaseStub implements ICreateMovieUseCase {
    async create(): Promise<Movie> {
      return mockMovie();
    }
  }

  return new CreateMovieUseCaseStub();
};

const mockRequest = (params = {}): Request => ({
  body: {
    name: "anyName",
    duration: 145,
    release_date: new Date("2020-06-16"),
    sinopsis: "anySinopsis",
    categories: ["anyCategory"],
    ...params,
  },
});

describe('CreateMovieController Tests', () => {
  let createMovieController: CreateMovieController;
  let createMovieUseCase: ICreateMovieUseCase;

  beforeEach(() => {
    createMovieUseCase = mockCreateMovieUseCase();
    createMovieController = new CreateMovieController(createMovieUseCase);
  });

  it('should return created on success', async () => {
    const request = mockRequest();

    const response = await createMovieController.handle(request);

    expect(response).toEqual(created(mockMovie()));
  });

  it('should return badRequest when movie with name already exists', async () => {
    jest
      .spyOn(createMovieUseCase, 'create')
      .mockRejectedValueOnce(new MovieAlreadyExistsError());

    const request = mockRequest();

    const response = await createMovieController.handle(request);

    expect(response).toEqual(badRequest({ error: 'Movie already exists' }));
  });

  it('should return internalServerError when something wrong happened', async () => {
    jest
      .spyOn(createMovieUseCase, 'create')
      .mockRejectedValueOnce(new Error('any error'));

    const request = mockRequest();

    const response = await createMovieController.handle(request);

    expect(response).toEqual(internalServerError());
  });
});