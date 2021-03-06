const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const Recipe = require('../models/recipe');
const User = require('../models/user');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
	const uri = await mongod.getUri();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.set('useCreateIndex', true);
	mongoose.set('useFindAndModify', false);

	await mongoose.connect(uri, mongooseOpts);
};


module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

module.exports.clearDatabase = async () => {
	await Recipe.deleteMany({});
	await User.deleteMany({});
};