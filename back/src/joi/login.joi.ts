import Joi from "joi";
import { passwordRegex } from "./patterns";
import { ILogin } from "../@types/user";

const schema = Joi.object<ILogin>({
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().pattern(passwordRegex).min(5).max(30).required(),
});

export { schema as joiLoginSchema };
