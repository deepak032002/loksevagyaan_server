import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.local" });
}

import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import blogRouter from "./routes/blog.routes";

import sequelize from "./db";

const port = process.env.PORT || 5000;

// env setup

sequelize.authenticate().then(() => {
  const app: Express = express();
  app.disable("x-powered-by");
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/blog", blogRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello 🙂");
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});