import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import expressFileupload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(compression());
app.use(expressFileupload({ useTempFiles: true }));
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello from server");
});

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});

// error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: { status: err.status || 500, message: err.message },
  });
});

export default app;
