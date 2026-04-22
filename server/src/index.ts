import express from "express";
import cors from "cors";
import { config } from "./config"
import connectDB from "./configurations/db";
import router from "./routes";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { write } from "node:fs";
import { logger } from "./utils/logger";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const morganStream = { write: (message: string) => logger.http(message.trim())};
app.use(morgan("combined", { stream: morganStream }));

app.listen(config.PORT, () => {
    logger.info(`\n Server is running on port ${config.PORT} \n`)
})

app.use("/api", router);

app.use(errorHandler);