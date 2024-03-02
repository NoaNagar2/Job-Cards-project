import Joi from "joi";
import { passwordRegex, phoneRegex } from "./patterns";
import { IUser } from "../@types/user";

const schema = Joi.object<IUser>({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(15).required(),
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().pattern(passwordRegex).min(5).max(100).required(),
  isBusiness: Joi.boolean().required(),
});

export { schema as joiUserSchema };
