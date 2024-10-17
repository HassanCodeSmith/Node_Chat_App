import { BadRequestError } from "../errors/index.js";

export const passwordValidation = (req, res, next) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(req.body.password);
  const hasLowerCase = /[a-z]/.test(req.body.password);
  const hasNumber = /[0-9]/.test(req.body.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(req.body.password);

  if (req.body.password.length < minLength) {
    throw new BadRequestError("Password minimum length must be 8.");
  }

  if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
    next();
  } else {
    throw new BadRequestError(
      "Password must contain 'uppercase, lowercase letter, number, special character' & password minimum length must be 8"
    );
  }
};
