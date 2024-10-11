import { BadRequestError } from "../errors/index.js";

export const emailValidation = async (req, res, next) => {
  if (!req?.body?.email) {
    throw new BadRequestError("Email is required.");
  }

  req.body.email = req.body.email.toLowerCase();

  if (
    !String(req.body.email).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new BadRequestError("Invalid email address.");
  }

  next();
};
