export class ValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
  }
}

export class ParametersError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
  }
}
