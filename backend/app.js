const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const recipesRouter = require("./controllers/recipes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const app = express();

logger.info("Connecting to ", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((err) => {
		logger.err("Error connecting to MongoDB: ", err.message);
	});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;