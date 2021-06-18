import { IListMoviesPremieresUseCase } from "@/domain/useCases/listMovies/IListMoviesPremieresUseCase";
import {  internalServerError, ok, Request, Response } from "../protocols/Http";
import { IController } from "../protocols/IController";

class ListMoviePremieresController implements IController {
  constructor(private readonly listMoviePremieresUseCase: IListMoviesPremieresUseCase) {}
  async handle(request: Request): Promise<Response> {
    try {
      const movies = await this.listMoviePremieresUseCase.listPremieres();
      return ok(movies);

    } catch (error) {
      return internalServerError();
    }
  }
}

export { ListMoviePremieresController }