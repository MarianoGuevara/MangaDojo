import { Request, Response } from "express";
import {IHttpResponse} from "../../InterfaceAdapter/Interfaces/IHttpResponse";
import {IHttpRequest} from "../../InterfaceAdapter/Interfaces/IHttpRequest";

export class ExpressMapper {
  static toHttpRequest(req: Request): IHttpRequest<any, any, any> {
    return {
      body: req.body,
      params: req.params,
      query: req.query
    };
  }

  static toExpressResponse(res: Response, httpResponse: IHttpResponse<any>): void {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
}