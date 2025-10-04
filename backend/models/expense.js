import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    employee: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    paidBy: { type: String, required: true },
    remarks: { type: String },
    amount: { type: String, required: true },
    status: { type: String, default: "To Submit" },
    receipt: { type: String },
  },
  { timestamps: true }
);

// 👇 this must be ES export
const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
