import { CreateMovieParams } from "@/domain/useCases/createMovies/ICreateMovieUseCase";
import { connect, disconnect } from "@/infra/database/mongodb";
import { MovieRepository } from "@/infra/database/mongodb/repositories/MovieRepository"
import { MovieSchema } from "@/infra/database/mongodb/schemas/MovieSchema";


describe ('MovieRepository Tests', () => {
  let movieRepository: MovieRepository;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await MovieSchema.deleteMany({});
    movieRepository = new MovieRepository();
  });

  afterEach(async ()=> {
    await disconnect();
  });

  describe('loadByName()', ()=>{
    it('should return movie by Name', async () => {
      const createMovieParams: CreateMovieParams = {
        name: 'anyname',
        duration: 145,
        release_date: new Date(),
        sinopsis: "anySinopsis",
        categories: ["anyCategory"],
      };

      const movie = await MovieSchema.create(createMovieParams);

      const result = await movieRepository.loadByName(
        createMovieParams.name
      );

      expect(result).toBeDefined();
      expect(String(result?.id)).toBe(String(movie.id));
      expect(result?.name).toBe(createMovieParams.name);
    });

    it('should return undefined when find by name has no match', async () => {
      const result = await movieRepository.loadByName('anyname');

      expect(result).toBeUndefined();
    });
  });
  });