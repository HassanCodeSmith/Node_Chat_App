import { CustomError } from "./customError.js";

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

export { BadRequestError };
