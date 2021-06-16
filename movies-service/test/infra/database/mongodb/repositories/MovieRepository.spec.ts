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

  afterAll(async ()=> {
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

      const movie = await movieRepository.create(createMovieParams);

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

  describe("listAll()", () => {
    it("should return list all movies", async () => {
      const createMovieParams: CreateMovieParams = {
        name: 'anyname',
        duration: 145,
        release_date: new Date(),
        sinopsis: "anySinopsis",
        categories: ["anyCategory"],
      };

      const movie = await MovieSchema.create(createMovieParams);

      const result = await movieRepository.listAll({ page: 1, limit: 10 });

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(String(result[0].id)).toBe(String(movie._id));
    });

    it('should be able to return movies paginated', async () => {
      const createMovieParams: CreateMovieParams = {
        name: 'anyname',
        duration: 145,
        release_date: new Date(),
        sinopsis: "anySinopsis",
        categories: ["anyCategory"],
      };

      const movie = await MovieSchema.create(createMovieParams);

      await MovieSchema.create({
        name: 'anyname2',
        duration: 145,
        release_date: new Date(),
        sinopsis: "anySinopsis2",
        categories: ["anyCategory2"],
      });

      const result = await movieRepository.listAll({ page: 2, limit: 1 });

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(String(result[0].id)).toBe(String(movie._id));
  });
  });

  describe("create()",  () => {
    it('should create movie', async () => {
      const createMovieParams: CreateMovieParams = {
        name: 'anyname',
        duration: 145,
        release_date: new Date(),
        sinopsis: "anySinopsis",
        categories: ["anyCategory"],
      };

      const movie = await movieRepository.create(createMovieParams);

      expect(movie).toBeDefined();
      expect(movie.id).toBeDefined();
    });
  })
});