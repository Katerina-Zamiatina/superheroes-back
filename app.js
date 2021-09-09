const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { errorHandler } = require('./src/helpers/apiHelpers');
const heroesRouter = require('./src/routes/heroes');
const filesRouter = require('./src/routes/files');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/heroes', heroesRouter);
app.use('/files', filesRouter);

app.use(errorHandler);

module.exports = app;
