import { Schema } from "mongoose";
import { IUser } from "../../@types/user";

const userSchema = new Schema<IUser>({
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
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: {
    required: false,
    type: Boolean,
  },
  isBusiness: {
    required: true,
    type: Boolean,
  },
  cardId: {
    required: false,
    type: String,
    minlength: 0,
    maxlength: 100,
  },
});

export { userSchema };
