import Joi from "joi";
import { ICard } from "../@types/cards";
import { phoneRegex } from "./patterns";

const schema = Joi.object<ICard>({
  url: Joi.string().min(2).max(200).required(),
  alt: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(100).required(),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().min(5).max(255).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(20).required(),
  location: Joi.string().min(0).max(20),
  jobType: Joi.string().min(2).max(100).required(),
  domain: Joi.string().min(2).max(100).required(),
  studies: Joi.string().min(2).max(100).required(),
  years: Joi.number().min(0).max(100).required(),
});

export { schema as joiCardSchema };
