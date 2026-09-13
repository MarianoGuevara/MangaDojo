// diccionario clave-valor para los parámetros de ruta
export interface IHttpRequest<TBody=unknown, TParams=Record<string, string>, TQuery=Record<string, unknown>> {
  body: TBody;
  params: TParams; 
  query: TQuery;
  user?: { // puede estar o no, dependiendo de si esta logueado o no
        userId: number;
        email: string;
  };
}