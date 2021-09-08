const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// const { errorHandler } = require('./src/helpers/apiHelpers')
const heroesRouter = require('./routes/heroes');

const app = express();
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/heroes', heroesRouter);

// app.use(errorHandler)

module.exports = app;
