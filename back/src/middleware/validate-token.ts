import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-servise";
import { User } from "../database/model/user";
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

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new JobCardError("User does not exist", 401);
    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken };
