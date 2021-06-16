import { MovieAlreadyExistsError } from "@/data/errors/MovieAlredyExistsError";
import { ICreateMovieUseCase } from "@/domain/useCases/createMovies/ICreateMovieUseCase";
import { badRequest, created, internalServerError, Request, Response } from "../protocols/Http";
import { IController } from "../protocols/IController";

class CreateMovieController implements IController {
  constructor(private readonly createMovieUseCase: ICreateMovieUseCase) {}
  async handle(request: Request): Promise<Response> {
    const {  
       name,
      sinopsis,
      duration,
      release_date,
      categories } = request.body;

      try {
        const movie = await this.createMovieUseCase.create({ name, duration, sinopsis, release_date, categories});
        return created(movie);
      } catch (error) {
        if(error instanceof MovieAlreadyExistsError) {
          return badRequest({error: error.message})
        }

        return internalServerError();
      }
  }
}

export {CreateMovieController}