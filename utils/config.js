/* eslint-disable no-undef */
require('dotenv').config();

const { PORT, MONGODB_URI, MONGODB_URI_DEV } = process.env;

module.exports = {
	PORT,
	MONGODB_URI,
	MONGODB_URI_DEV
};