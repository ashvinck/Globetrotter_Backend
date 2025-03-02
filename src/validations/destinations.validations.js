import Joi from 'joi';

const destinationSchema = Joi.object({
  id: Joi.string().required(),
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  clues: Joi.array().items(Joi.string().min(5)).min(2).required(), // At least one clue
  fun_fact: Joi.array().items(Joi.string().min(5)).min(2).required(), // At least one fun fact
  trivia: Joi.array().items(Joi.string().min(5)).min(2).required(), // At least one trivia
  options: Joi.array().items(Joi.string().min(2)).length(4).required(), // Exactly 4 options
});

// Schema for the entire request
const destinationsSchema = Joi.object({
  destinations: Joi.array().items(destinationSchema).min(1).required(),
});

// Middleware function for validation
const validateDestinations = (req, res, next) => {
  const { error } = destinationsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  next();
};

export { validateDestinations };
