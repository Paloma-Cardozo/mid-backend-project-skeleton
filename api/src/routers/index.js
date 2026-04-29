import express from "express";
import apiRouter from "#routers/api.js";

const rootRouter = express.Router();

rootRouter.use("/api", apiRouter);

rootRouter.use((req, res, next) => {
  if (req.path.startsWith("/docs")) {
    return next();
  }

  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});

export default rootRouter;
