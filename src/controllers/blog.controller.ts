import { Request, Response } from "express";
import Blog from "../models/blog.model";
import User from "../models/user.model";

const getBlog = async (req: Request, res: Response) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ["id", "title", "content", "image", "slug"],
    });

    return res.status(200).send({ message: "Success", blogData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", error, success: false });
  }
};

const postBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, image } = req.body;

    const blog = Blog.build({
      title,
      content,
      image,
      userId: req.user,
    });

    await blog.save();

    return res.status(200).send({ message: "Successfully Created!", blog });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.errors[0].message,
    });
  }
};

const patchBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, image } = req.body;

    const isUpdateBlog = await Blog.update(
      {
        title,
        content,
        image,
      },
      { where: { slug: req.params.slug }, individualHooks: true }
    );

    return res
      .status(200)
      .send({ message: "Successfully Updated!", isUpdateBlog });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.errors[0].message,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const isDeleteBlog = await Blog.destroy({
      where: { slug: req.params.slug },
    });

    return res
      .status(200)
      .send({ message: "Successfully Deleted!", isDeleteBlog });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", error, success: false });
  }
};

const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogData = await Blog.findOne({
      where: { slug: req.params.slug },
      attributes: ["id", "title", "content",  "slug"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return res.status(200).send({ message: "Success", blogData });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ message: "Something went wrong!", error, success: false });
  }
};

export { getBlog, postBlog, patchBlog, deleteBlog, getBlogById };
