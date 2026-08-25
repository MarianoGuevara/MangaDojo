export interface IHttpResponse<TData=unknown> {
  statusCode: number;
  body: TData;
}