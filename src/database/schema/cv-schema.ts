import { Schema } from "mongoose";
import { Icv } from "../../@types/cv";

const cvSchema = new Schema<Icv>({
  file: {
    type: [String],
    required: true,
    default: [],
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
});

export { cvSchema };
