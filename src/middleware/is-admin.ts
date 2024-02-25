import { RequestHandler, Request } from "express";
import { User } from "../database/model/user";
import { auth } from "../service/auth-servise";
import { JobCardError } from "../error/job-card-error";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");
  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    return authHeader.substring(7);
  }
  throw new JobCardError("token is missing in Authorization header", 400);
};

const isAdmin: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);
  const { email } = auth.verifyJWT(token);

  const user = await User.findOne({ email });

  const isAdmin = user?.isAdmin;
  if (isAdmin) {
    return next();
  }

  return res.status(401).json({ message: "Must be adming" });
};

export { isAdmin, extractToken };
