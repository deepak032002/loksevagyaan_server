import { NextFunction, Request, Response } from "express";
import user from "../db/models/user.model";
// import catchAsyncError from "../middlewares/catchAsyncError";
// import { catchAsyncError } from "../middlewares";

export const login = async (req: Request, res: Response) => {
  res.send("login");
};
