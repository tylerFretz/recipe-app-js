/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = await User.findOne({ email: body.email }, 'username id passwordHash');
	const isPasswordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordHash);

	if (!(user && isPasswordCorrect)) {
		return res.status(401).json({
			error: 'invalid email or password'
		});
	}

	const userForToken = {
		username: user.username,
		email: user.email,
		id: user._id
	};

	// Token expires in 1 hour
	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 60 });
	res.status(200).send({ token, user });
});

module.exports = loginRouter;