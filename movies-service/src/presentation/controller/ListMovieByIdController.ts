import { MovieNotFoundError } from "@/data/errors/MovieNotFoundError";
import { IListMovieByIdUseCase } from "@/domain/useCases/listMovies/IListMovieByIdUseCase";
import { badRequest, internalServerError, ok, Request, Response } from "../protocols/Http";
import { IController } from "../protocols/IController";

class ListMovieByIdController implements IController {
  constructor(private readonly listMovieByIdUseCase: IListMovieByIdUseCase) {}
  async handle(request: Request): Promise<Response> {
    try {
      const { id } = request.params;
      const movies = await this.listMovieByIdUseCase.loadById(id);
      return ok(movies)
    } catch (error) {
      console.log(error);
      if(error instanceof MovieNotFoundError) {
     
       return badRequest({ error: error.message})
     }
      return internalServerError();
    }
  }
}

export { ListMovieByIdController }