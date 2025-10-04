const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  country: String,
  currency: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
