import { Router } from "express";
import multer from "multer";
import {
  getBlog,
  postBlog,
  patchBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blog.controller";
import { uploadImage, validate, verifyToken } from "../middlewares";
import { blogValidateSchema } from "../utils/joi.schema";

const router = Router();
router.use(multer().single("image"));
router
  .route("/")
  .get(getBlog)
  .post(verifyToken, validate(blogValidateSchema), uploadImage, postBlog);

router
  .route("/:slug")
  .patch(verifyToken, patchBlog)
  .delete(verifyToken, deleteBlog)
  .get(getBlogById);

export default router;
