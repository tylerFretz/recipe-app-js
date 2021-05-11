const express = require("express");
const expressStaticGzip = require("express-static-gzip");
require("express-async-errors");
const cors = require("cors");
const logger = require("./utils/logger");
const db = require("./utils/db_helper");
const mockDb = require("./tests/mockDb_helper");
const middleware = require("./utils/middleware");
const recipesRouter = require("./controllers/recipes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

const app = express();

if (process.env.NODE_ENV === "test") {
	mockDb.connect().catch(err => {
		logger.error(err);
	});
	app.use("/api/testing", testingRouter);
} else {
	db.connect().catch(err => {
		logger.error(err);
	});
}

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(
	"/",
	expressStaticGzip("build/", {
		enableBrotli: true,
		orderPreference: ["br", "gz"],
		setHeaders: (res) => {
			res.setHeader("Cache-Control", "public, max-age=31536000");
		},
	})
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;