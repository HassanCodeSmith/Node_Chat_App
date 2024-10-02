import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

/** _____ .env configuration _____ */
dotenv.config();

/** _____ Express instance _____ */
const app = express();

/** _____ Middlewares _____ */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("./public", express.static("public"));

/** _____ Testing Route _____ */
app.get("/", (req, res) => {
  res.send("<h2>Server is Running.</h2>");
});

/** _____ Routes _____ */

/** _____ Error Handling Middlewares _____ */
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
