require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const alertRoutes = require('./routes/alerts.js');
const logger = require('./middleware/logger');
const cors = require('cors');
const Joi = require('joi');

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.DB_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

main()
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGODB_URL);
}

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://flying-panda.vercel.app'],
  })
);

app.use(logger);

app.use('/alerts', alertRoutes);

app.use((req, res, next) => {
  next(new ExpressError(404, 'Page not found!'));
});

app.use((err, req, res, next) => {
  let { status = 500, message = 'SOME ERROR OCCURED!' } = err;
  // res.status(status).render('error', { message });
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
