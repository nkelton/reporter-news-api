const Joi = require("joi");

const schema = Joi.object().keys({
  reporter: Joi.string()
    .regex(/^[A-Za-z]+-[A-Za-z]+$/)
    .min(1)
    .max(100)
    .required()
});

module.exports = schema;
