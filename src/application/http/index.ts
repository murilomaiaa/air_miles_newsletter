export type HttpRequest<T = unknown> = {
  body: T;
};

export type HttpResponse<T> = {
  body: T;
  status: number;
};
