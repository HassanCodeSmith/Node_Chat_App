import { CustomError } from "./customError.js";

/**
 *  Forbidden Error Signifies you lack permission to access a certain part of Website.
 *  403 Forbidden: Ye tab aata hai jab user authenticated hai lekin usko kisi specific
 *  resource ya action ki permission nahi hai.
 */
class ForBiddenError extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}

export { ForBiddenError };
