export type Request = {
  body?: any;
  params?: any;
  query?: any;
};

export type Response = {
  statusCode: number;
  body?: any;
};
