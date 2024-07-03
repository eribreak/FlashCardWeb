import express, { Express, Request, Response, Application } from "express";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import appRouter from "./src/boudary/index.router";
import { connectDB } from "./src/database/mongodb/connect.mongo";
import Logger from "./src/lib/logger";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

config();
// * innitialization
const app: Application = express();
const PORT = process.env.PORT || 5001;

// * middleware
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
// * api version
app.use(appRouter);

const prisma = new PrismaClient();
async function main() {
  const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
