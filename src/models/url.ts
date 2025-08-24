import { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    shortUrlId: {
      type: String,
      unique: true,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    visits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = model("urls", urlSchema);

export default Url;
