import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.config.js";

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

logger.info("NODE_ENV: " + process.env.NODE_ENV);

// Connect to mongodb
mongoose.connect(DATABASE_URL).then(() => {
  logger.info("Connected to MongoDB");
});

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error: ${err}`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info(`server is listening at ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", unexpectedErrorHandler);
