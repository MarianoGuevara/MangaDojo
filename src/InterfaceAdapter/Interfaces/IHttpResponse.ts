export interface IHttpResponse<TData=unknown> {
  statusCode: number;
  body: TData;
  // en la respuesta de un http no importa el usuario autentificado, es el la entrada por el token nomas
}