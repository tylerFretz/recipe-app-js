const logger = require("./logger");

const requestLogger = (req, res, next) => {
	logger.info("Method:", req.method);
	logger.info("Path:  ", req.path);
	logger.info("Body:  ", req.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};


const tokenExtractor = (req, res, next) => {
	const authorization = req.get("authorization");
	req.token = null;

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.token = authorization.substring(7);
	}

	next();
};

const errorHandler = (err, req, res, next) => {
	if (!err) next();

	logger.error(err.message);

	if (err.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" });
	}
	else if (err.errors && err.errors.url && err.errors.url.kind === "regexp") {
		return res.status(400).send({ error: "Improper url submitted" });
	}
	else if (err.errors && err.errors.url && err.errors.url.kind === "unique") {
		return res.status(400).send({ error: "Url is already in the database" });
	}
	else if (err.name === "ValidationError") {
		return res.status(400).json({ error: err.message });
	}
	else if (err.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "invalid token" });
	}
	else if (err.name === "TokenExpiredError") {
		return res.status(401).json({ error: "token expired" });
	}

	next(err);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
};