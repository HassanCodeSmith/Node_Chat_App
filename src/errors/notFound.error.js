import { CustomError } from "./customError.js";

/**
 * The HTTP 404 Not Found client error response status code indicates that
 * the server cannot find the requested resource.
 */
class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

export { NotFoundError };
