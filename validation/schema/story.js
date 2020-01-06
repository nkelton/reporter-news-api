const Joi = require("joi");

const schemas = {
  storyPOST: Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .max(100)
      .required(),
    description: Joi.string()
      .alphanum()
      .length(250)
      .optional(),
    link: Joi.string()
      .regex(
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
      )
      .required(),
    published: Joi.date().optional(),
    reporter: reporterPOST
  }),
  storyPUT: Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .max(100)
      .optional(),
    description: Joi.string()
      .alphanum()
      .length(250)
      .optional(),
    link: Joi.string()
      .regex(
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
      )
      .optional(),
    published: Joi.date().optional(),
    reporter: reporterPUT
  }),
  storyGET: Joi.object().keys({
    reporterName: Joi.string()
      .regex(/^[A-Za-z]+-[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required()
  })
};

const reporterPOST = Joi.object()
  .keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .required(),
    description: Joi.string()
      .max(250)
      .optional()
  })
  .required();

const reporterPUT = Joi.object()
  .keys({
    name: Joi.string()
      .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
      .min(1)
      .max(100)
      .optional(),
    description: Joi.string()
      .max(250)
      .optional()
  })
  .optional();

module.exports = schemas;
