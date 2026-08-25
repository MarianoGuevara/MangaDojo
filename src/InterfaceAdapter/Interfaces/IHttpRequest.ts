// diccionario clave-valor para los parámetros de ruta
export interface IHttpRequest<TBody=unknown, TParams=Record<string, string>, TQuery=Record<string, unknown>> {
  body: TBody;
  params: TParams; 
  query: TQuery;
}