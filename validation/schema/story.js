const Joi = require("joi");

const URL_REGREX =
  "/(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})/";

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
      .regex(URL_REGREX)
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
      .regex(URL_REGREX)
      .optional(),
    published: Joi.date().optional()
  })
};

module.exports = schemas;
