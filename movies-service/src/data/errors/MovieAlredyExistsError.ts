 class MovieAlreadyExistsError extends Error {
  constructor() {
    super('Movie already exists');

    this.name = 'MovieAlreadyExistsError';
  }
}

export {MovieAlreadyExistsError}