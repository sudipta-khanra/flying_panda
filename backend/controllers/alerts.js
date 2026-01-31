const Alert = require('../models/alert.js');
const ExpressError = require('../utils/ExpressError');

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
  const alert = new Alert(req.body);
  await alert.save();
  res.status(201).json(alert);
};

// PUT /alerts/:id
module.exports.updateAlert = async (req, res) => {
  const { id } = req.params;
  const alert = await Alert.findByIdAndUpdate(id, req.body, { new: true });
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
