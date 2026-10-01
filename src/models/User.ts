import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // Hashed password
  solved: Record<string, boolean>; // Maps problem ID to true
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    solved: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in Next.js development
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
