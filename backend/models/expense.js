const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  amount: Number,
  currency: String,
  category: String,
  description: String,
  date: Date,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  approvalFlow: [
    {
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: String,
      sequence: Number,
      status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
      comments: String
    }
  ],
  finalApprovalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
