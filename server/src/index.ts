import express from "express";
import cors from "cors";
import { config } from "./config";
import connectDB from "./configurations/db";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { checkRequiredEnv } from "./configurations/checkEnv";

checkRequiredEnv();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.listen(config.PORT, () => {
  console.log(`\n Server is running on port ${config.PORT} \n`);
});

app.use("/api", router);

app.use(errorHandler);
