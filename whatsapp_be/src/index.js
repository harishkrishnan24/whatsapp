import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

mongoose.connect(DATABASE_URL).then(() => {
  logger.info("Connected to MongoDB...");
});

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

let server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}...`);
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

process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
