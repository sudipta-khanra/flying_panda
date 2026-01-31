const Alert = require('../models/alert.js');
const ExpressError = require('../utils/ExpressError');
const alertJoiSchema = require('../schema.js'); // your Joi schema

// GET /alerts
module.exports.getAlerts = async (req, res) => {
  const { country, status } = req.query;
  let filter = {};
  if (country) filter.country = country;
  if (status) filter.status = status;
  const alerts = await Alert.find(filter);
  res.status(200).json(alerts);
};

// POST /alerts
module.exports.createAlert = async (req, res) => {
  // Validate request body
  const { error, value } = alertJoiSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return res
      .status(400)
      .json({ message: 'Validation error', details: messages });
  }

  const alert = new Alert(value); // use validated data
  await alert.save();
  res.status(201).json(alert);
};

// PUT /alerts/:id
module.exports.updateAlert = async (req, res) => {
  // For updates, allow partial fields (make required fields optional)
  const { error, value } = alertJoiSchema
    .fork(['country', 'city', 'visaType'], (field) => field.optional())
    .validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((d) => d.message);
    return res
      .status(400)
      .json({ message: 'Validation error', details: messages });
  }

  const { id } = req.params;
  const alert = await Alert.findByIdAndUpdate(id, value, { new: true });
  if (!alert) throw new ExpressError(404, 'Alert not found');
  res.status(200).json(alert);
};

// DELETE /alerts/:id
module.exports.deleteAlert = async (req, res) => {
  const { id } = req.params;
  const alert = await Alert.findByIdAndDelete(id);
  if (!alert) throw new ExpressError(404, 'Alert not found');
  res.status(204).send();
};
