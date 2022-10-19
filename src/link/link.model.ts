import { Schema, model, Types } from "mongoose";

const schema = new Schema({
  link: { type: String, required: true },
  short: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

export const LinksModel = model("Links", schema);
