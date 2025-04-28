import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import teamRoutes from "./src/routes/teamRoutes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";
dotenv.config();

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser());

app.use("/teams", teamRoutes);

app.listen(port, host, () => {
  console.log(
    `${chalk.cyan("🌐 Team Service")} running in ${chalk.yellow(
      process.env.NODE_ENV
    )} environment and ready at http://${chalk.green(host)}:${chalk.green(
      port
    )}`
  );
});

app.use(errorHandler);
