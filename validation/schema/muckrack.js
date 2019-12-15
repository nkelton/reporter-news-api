const Joi = require("joi");

const schemas = {
  articleGET: Joi.object().keys({
    reporter: Joi.string()
      .regex(/^[A-Za-z]+-[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required()
  })
};

module.exports = schemas;
