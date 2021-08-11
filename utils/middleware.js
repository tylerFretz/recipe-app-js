const fs = require('fs');
const nodePath = require('path');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:  ', req.path);
	logger.info('Body:  ', req.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (req, res) => {
	const documentPath = nodePath.join(__dirname, '../build', 'index.html');
	const documentExists = fs.existsSync(documentPath);

	if (documentExists) {
		res.sendFile(documentPath);
	} else {
		res.status(404).send({ error: `There is no resource at ${req.url}` });
	}
};


const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	req.token = null;

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7);
	}
	next();
};

const errorHandler = (err, req, res, next) => {
	if (!err) next();

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	}
	else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}
	else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	}
	else if (err.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}

	logger.error(err);

	next(err);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
};