import { ParametersError, ValidationError } from "./errors.js";

export const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch((err) => {
      if (err.path === "_id") {
        next(new ParametersError("Not found"));
        return;
      }

      next(err);
    });
  };
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof ParametersError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};
