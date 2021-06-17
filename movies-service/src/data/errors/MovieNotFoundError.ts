class MovieNotFoundError extends Error {
  constructor() {
    super('Movie not found');
    this.name = 'MovieNotFoundError';
  }
}

export {MovieNotFoundError}