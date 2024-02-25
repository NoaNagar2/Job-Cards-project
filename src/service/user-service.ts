import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { JobCardError } from "../error/job-card-error";
import { auth } from "./auth-servise";

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  user.password = await auth.hashPassword(user.password);
  const email = user.email;
  const isBusiness = user.isBusiness;
  const jwt = auth.generateJWT({ email, isBusiness });

  return user.save(), jwt;
};

const validateUser = async (
  email: string,
  password: string,
  isBusiness: boolean
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new JobCardError("Bad credentials", 401);
  }

  //check the password:
  const isPasswordValid = await auth.validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw new JobCardError("Bad credentials", 401);
  }

  const jwt = auth.generateJWT({ email, isBusiness });

  return { jwt };
};

export { createUser, validateUser };
