import { IHttpRequest } from "./IHttpRequest";
import { IHttpResponse } from "./IHttpResponse";

export interface IController<TInput=unknown, TOutput=unknown> {
  getAll(request: IHttpRequest<TInput, any, any>): Promise<IHttpResponse<TOutput>>;
}