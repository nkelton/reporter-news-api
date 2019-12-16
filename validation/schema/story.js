const Joi = require("joi");

const schemas = {
  storyPOST: Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .max(100)
      .required(),
    reporterId: Joi.string()
      .alphanum()
      .length(24)
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
    published: Joi.date().optional()
  }),
  storyPUT: Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .max(100)
      .optional(),
    reporterId: Joi.string()
      .alphanum()
      .length(24)
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
    published: Joi.date().optional()
  })
};

module.exports = schemas;
