import { RequestHandler, Request } from "express";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-servise";
import { IUser } from "../@types/user";
import { JobCardError } from "../error/job-card-error";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;

    if (!user) throw new JobCardError("User does not exist", 401);

    if (id == user?._id) return next();

    res.status(401).json({ message: "The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isUser };
