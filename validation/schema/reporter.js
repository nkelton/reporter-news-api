const Joi = require("joi");

const schemas = {
  reporterPOST: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required(),
    description: Joi.string()
      .max(250)
      .optional()
  }),
  reporterPUT: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .optional(),
    description: Joi.string()
      .max(250)
      .optional()
  })
};

module.exports = schemas;
