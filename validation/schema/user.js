const Joi = require("joi");

const schemas = {
  userPOST: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .max(100)
      .required(),
    phone: Joi.string()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .max(50)
      .required()
  }),
  userAUTH: Joi.object().keys({
    phone: Joi.string()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .required(),
    password: Joi.string()
      .max(50)
      .required()
  }),
  userPUT: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .max(100)
      .optional(),
    phone: Joi.string()
      .regex(/^[1-9]{1}[0-9]{9}$/)
      .optional(),
    email: Joi.string()
      .email()
      .optional(),
    password: Joi.string()
      .max(50)
      .optional()
  }),
  reporterForUserPUT: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required(),
    description: Joi.string()
      .max(250)
      .optional()
  }),
  reporterForUserDELETE: Joi.object().keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required()
  })
};

module.exports = schemas;
