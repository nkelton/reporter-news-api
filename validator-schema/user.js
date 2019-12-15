const Joi = require("joi");

const schemas = {
  userPOST: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+-[A-Za-z]+$/)
      .max(100)
      .required(),
    phone: Joi.number()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .required(),
    email: Joi.string().email.require(),
    password: Joi.string()
      .max(50)
      .required(),
    isReporter: Join.boolean().require()
  }),
  userAUTH: Joi.object().keys({
    phone: Joi.number()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .required(),
    password: Joi.string()
      .max(50)
      .required()
  }),
  userPUT: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+-[A-Za-z]+$/)
      .max(100)
      .optional(),
    phone: Joi.number()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .optional(),
    email: Joi.string().email.optional(),
    password: Joi.string()
      .max(50)
      .optional(),
    isReporter: Join.boolean().optional()
  })
};

module.exports = schemas;
