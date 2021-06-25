import { Request, Response } from "./Http";

interface IController {
  handle(request: Request): Promise<Response>;
}

export { IController };
