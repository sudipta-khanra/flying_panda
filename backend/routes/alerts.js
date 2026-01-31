const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const alertsController = require('../controllers/alerts.js');

router
  .route('/')
  .get(wrapAsync(alertsController.getAlerts))
  .post(wrapAsync(alertsController.createAlert));

router
  .route('/:id')
  .put(wrapAsync(alertsController.updateAlert))
  .delete(wrapAsync(alertsController.deleteAlert));

module.exports = router;
