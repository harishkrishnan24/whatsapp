import app from "./app.js";
import logger from "./config/logger.config.js";

const PORT = process.env.PORT || 8000;

logger.info("NODE_ENV: " + process.env.NODE_ENV);

const server = app.listen(PORT, () => {
    logger.info(`server is listening at ${PORT}`);
});

const exitHandler = () => {
    if (server) {
        logger.info('Server closed.');
        process.exit(1);
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on('SIGTERM', unexpectedErrorHandler);