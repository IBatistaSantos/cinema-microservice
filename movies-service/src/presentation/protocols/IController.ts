  
import { Request, Response } from './Http';

export interface IController {
  handle(request: Request): Promise<Response>;
}