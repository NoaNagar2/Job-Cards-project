import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";
import { JobCardError } from "../error/job-card-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // userService Error
  Logger.error(err);
  if (err instanceof JobCardError) {
    return res.status(err.status).json({ message: err.message });
  }

  //   Mongoose Error
  if (err.code && err.code == 11000 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate Key",
      prpperty: err.keyValue,
      index: err.keyPattern,
    });
  }

  //   Json Error
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid Json" });
  }

  //   cathall
  return res.status(500).json({ message: "Internal Server Error" });
};

export { errorHandler };
