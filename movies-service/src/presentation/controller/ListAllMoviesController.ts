import { IListAllMoviesUseCase } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";;
import { internalServerError, ok, Request, Response } from "../protocols/Http";
import { IController } from "../protocols/IController";

class ListAllMoviesController implements IController {
  constructor(private readonly listAllMoviesUseCase: IListAllMoviesUseCase) {}
  async handle(request: Request): Promise<Response> {
    try {
      const movies = await this.listAllMoviesUseCase.listAll();
      return ok(movies)
    } catch (error) {
      return internalServerError();
    }
  }
}

export { ListAllMoviesController }