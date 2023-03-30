import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const SECREAT_PHRASE = process.env.SECREAT_PHRASE || "";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(400).send({ message: "token required", success: false });

  const userId = jwt.verify(token, SECREAT_PHRASE) as JwtPayload;

  req.user = userId.id;

  next();
};

export default verifyToken;
