export const trimObjects = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    } else if (typeof req.body[key] === "object" && req.body[key] !== null) {
      trimObjects(req.body[key]);
    }
  });
  next();
};
