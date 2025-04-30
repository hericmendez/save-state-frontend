import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["admin", "user"], default: "user" },
});

export const User = models.User || model("User", userSchema);
