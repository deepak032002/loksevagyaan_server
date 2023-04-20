import { Router } from "express";
import { userGet, signup, login } from "../controllers/user.controllers";
import { uploadImage, validate } from "../middlewares";
import verifyToken from "../middlewares/verifyToken";
import { userValidateSchema } from "../utils/joi.schema";
import multer from "multer";
const router = Router();
router.use(multer().single("profile"));
router.route("/").get(verifyToken, userGet);
router.route("/signup").post(validate(userValidateSchema), uploadImage, signup);
router.route("/login").post(login);

export default router;
