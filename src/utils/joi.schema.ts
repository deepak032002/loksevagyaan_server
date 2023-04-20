import joi from "joi";

export const userValidateSchema = joi.object().keys({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  mobile: joi.string().min(10).max(11),
  password: joi.string().min(8),
  confirm_password: joi
    .string()
    .valid(joi.ref("password"))
    .messages({ "any.only": "Confirm Password and Password not matched!" }),
});

export const blogValidateSchema = joi.object().keys({
  title: joi.string().required().min(3),
  content: joi.string().required().min(250),
});
