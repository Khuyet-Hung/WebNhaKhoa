import bcrypt from "bcryptjs/umd/types";
import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
  },
  { timestamps: true }
);

// Method instance
UserSchema.methods.checkPassword = async function (
  password: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// Middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});
const User = mongoose.model("User", UserSchema);

export default User;
