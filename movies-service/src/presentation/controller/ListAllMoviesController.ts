import { IListAllMoviesUseCase } from "@/domain/useCases/listMovies/IListAllMoviesUseCase";;
import { internalServerError, ok, Request, Response } from "../protocols/Http";
import { IController } from "../protocols/IController";

class ListAllMoviesController implements IController {
  constructor(private readonly listAllMoviesUseCase: IListAllMoviesUseCase) {}
  async handle(request: Request): Promise<Response> {
    try {
      const {page = 1, limit =10} = request.query;
      const movies = await this.listAllMoviesUseCase.listAll({ 
        page: Number(page),
        limit: Number(limit) 
      });
      return ok(movies)
    } catch (error) {
      return internalServerError();
    }
  }
}

export { ListAllMoviesController }