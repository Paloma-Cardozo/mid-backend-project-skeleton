function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    error: message,
    status: status,
  });
}

const middlewares = [notFoundHandler, errorHandler];
export default middlewares;
