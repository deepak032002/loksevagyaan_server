import { Router } from "express";
import {
  getBlog,
  postBlog,
  patchBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blog.controller";
import { validate, verifyToken } from "../middlewares";
import { blogValidateSchema } from "../utils/joi.schema";

const router = Router();

router
  .route("/")
  .get(getBlog)
  .post(verifyToken, validate(blogValidateSchema), postBlog);

router
  .route("/:slug")
  .patch(verifyToken, patchBlog)
  .delete(verifyToken, deleteBlog)
  .get(getBlogById);

export default router;
