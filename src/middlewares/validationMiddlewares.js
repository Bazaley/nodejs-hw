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
