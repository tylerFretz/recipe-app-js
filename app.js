const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('./utils/logger');
const db = require('./utils/db_helper');
const middleware = require('./utils/middleware');
const recipesRouter = require('./controllers/recipes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	const mockDb = require('./tests/mockDb_helper');
	mockDb.connect().catch(err => {
		logger.error(err);
	});
	app.use('/api/testing', testingRouter);
} else {
	db.connect().catch(err => {
		logger.error(err);
	});
}

app.use(cors());
app.use(express.static('./client/build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.get('/*', function (req, res) {
	res.sendFile('./client/build/index.html');
});


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;