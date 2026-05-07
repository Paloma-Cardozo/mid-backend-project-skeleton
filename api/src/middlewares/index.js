function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.error(err);

  let message;

  if (status >= 500) {
    message = "Internal server error";
  } else {
    message = err.message || "Internal server error";
  }

  res.status(status).json({
    error: message,
    status: status,
  });
}

const middlewares = [errorHandler];

export default middlewares;
