const errorHandler = (error, req, res, next) => {
  console.error(error);
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong try again later.",
  };

  if (error.name === "ValidationError") {
    customError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (error.code && error.code === 11000) {
    // 11000 is an error code for duplcate entities
    customError.message = `${Object.keys(error.keyValue)} already exists.`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.message = `No item found with id: ${error.value}`;
    customError.statusCode = 404;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, message: customError.message });
};

export { errorHandler };
