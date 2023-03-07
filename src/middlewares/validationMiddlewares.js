import Joi from "joi";
import { ValidationError } from "../helpers/errors.js";

export const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    phone: Joi.string().min(10).max(15).required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }

  next();
};

export const userValidation = (req, res, next) => {
  const schema = Joi.object({
    // eslint-disable-next-line prefer-regex-literals
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }

  next();
};
