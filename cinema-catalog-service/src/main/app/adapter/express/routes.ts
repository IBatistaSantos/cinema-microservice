import { Request, Response } from "express";

import { IController } from "../../../../presentation/procotols/IController";

const adapterRoute = (controller: IController) => {
  return async (
    originalRequest: Request,
    originalResponse: Response
  ): Promise<Response> => {
    const request = {
      params: originalRequest.params,
      body: originalRequest.body,
      query: originalRequest.query,
    };

    const { statusCode, body } = await controller.handle(request);

    return originalResponse.status(statusCode).json(body);
  };
};

export { adapterRoute };
