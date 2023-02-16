import Joi from "joi";

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
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};
