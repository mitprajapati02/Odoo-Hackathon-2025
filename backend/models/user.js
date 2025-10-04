const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "Manager", "Employee"], default: "Employee" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
