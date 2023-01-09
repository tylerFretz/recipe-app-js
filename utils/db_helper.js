const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

module.exports.connect = async () => {
	mongoose.connection.on('connected', () => {
		logger.info('Connection Established');
	});

	mongoose.connection.on('reconnected', () => {
		logger.info('Connection Reestablished');
	});

	mongoose.connection.on('disconnected', () => {
		logger.info('Connection Disconnected');
	});

	mongoose.connection.on('close', () => {
		logger.info('Connection Closed');
	});

	mongoose.connection.on('error', (error) => {
		logger.error(`ERROR: ${error}`);
	});

	if (process.env.NODE_ENV === 'test') {
		return Promise.resolve('');
	}

	if (process.env.NODE_ENV === 'development') {
		return mongoose.connect(config.MONGODB_URI_DEV);
	}

	return mongoose.connect(config.MONGODB_URI);
};