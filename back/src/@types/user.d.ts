import { ObjectId } from "mongoose";

type IUser = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  isAdmin: boolean;
  _id: string;
  cardId: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
  isBusiness: boolean;
};

export { IUser, ILogin, IJWTPayload };
