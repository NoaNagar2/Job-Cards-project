import mongoose from "mongoose";
import { cvSchema } from "../schema/cv-schema";

const CV = mongoose.model("cv", cvSchema);

export { CV };
