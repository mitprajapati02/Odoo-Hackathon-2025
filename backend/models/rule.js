const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  percentageRule: Number, // e.g., 60
  specificApprovers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  hybrid: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Rule", ruleSchema);
