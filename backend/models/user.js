import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // actual password
    tempPassword: { type: String }, // temporary password sent by admin
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },
    manager: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
