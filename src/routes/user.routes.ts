import {
  Errback,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { userGet, signup, login } from "../controllers/user.controllers";
import { uploadImage, validate } from "../middlewares";
import verifyToken from "../middlewares/verifyToken";
import { userValidateSchema } from "../utils/joi.schema";
import multer from "multer";
import Joi from "joi";
const router = Router();

router.use(multer().single("profile"));
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message, field: err.field });
  }

  if(err instanceof Joi.ValidationError){
    return res.status(400).json({ error: err.isJoi });
  }
  next();
});

router.route("/").get(verifyToken, userGet);
router.route("/signup").post(uploadImage, signup);
router.route("/login").post(login);

export default router;
