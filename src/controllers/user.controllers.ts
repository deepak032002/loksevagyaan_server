import { Request, Response } from "express";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { userValidateSchema } from "../utils/joi.schema";
const JWT_SECRET = process.env.SECREAT_PHRASE || "";

export const userGet = async (req: Request, res: Response) => {
  try {
    const userData = await User.findByPk(req.user, {
      attributes: ["id", "name", "email", "mobile", "profile"],
    });

    return res.status(200).send({ message: "Success", userData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", success: false });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    await userValidateSchema.validateAsync(req.body);

    const { name, email, mobile, password } = req.body;
    const isEmailExist = await User.findOne({ where: { email: email } });

    if (isEmailExist)
      return res
        .status(400)
        .send({ message: "email already exist!", success: false });

    let obj = {
      name,
      email,
      mobile,
      password: await User.hashPassword(password),
      profile: req.file,
    };

    let userdata = await User.create(obj);

    res.status(200).send({ message: "Successfully Created!", userdata });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(404)
        .send({ message: "Credentials missing!", success: false });

    const userData: any = await User.findOne({ where: { email: email } });

    if (!userData)
      return res
        .status(404)
        .send({ message: "Wrong credentials!", success: false });

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch)
      return res
        .status(404)
        .send({ message: "Wrong credentials!", success: false });

    const token = jwt.sign({ id: userData.id }, JWT_SECRET);

    res.status(200).send({ message: "Successfully logged in!", token });
  } catch (error) {}
};
