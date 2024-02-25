import mongoose, { Schema } from "mongoose";
import { ICard } from "../../@types/cards";

const cardSchema = new Schema<ICard>({
  url: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  alt: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  firstName: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 20,
  },
  location: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  jobType: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  domain: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  studies: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  userId: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  // years: {
  //   required: true,
  //   type: Number,
  //   minlength: 0,
  //   maxlength: 100,
  // },
});

export { cardSchema };
