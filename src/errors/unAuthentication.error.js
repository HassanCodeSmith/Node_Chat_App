import { CustomError } from "./customError.js";

/**
 * 401 Unauthorized: Ye tab aata hai jab user authenticate nahi hua ya invalid credentials diye hain.
 */
class UnAuthenticationError extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}

export { UnAuthenticationError };
