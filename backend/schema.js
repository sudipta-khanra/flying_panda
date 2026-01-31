const Joi = require('joi');

const alertJoiSchema = Joi.object({
  country: Joi.string().trim().required(),

  city: Joi.string().trim().required(),

  visaType: Joi.string().valid('Tourist', 'Business', 'Student').required(),
  status: Joi.string().valid('Active', 'Booked', 'Expired').default('Active'),
});

module.exports = alertJoiSchema;
