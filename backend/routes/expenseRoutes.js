import express from "express";
import multer from "multer";
import path from "path";
import Expense from "../models/expense.js"; // ✅ now works

const router = express.Router();

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// 📌 Create Expense
router.post("/", upload.single("receipt"), async (req, res) => {
  try {
    const expense = new Expense({
      employee: req.body.employee,
      description: req.body.description,
      date: req.body.date || new Date().toLocaleDateString(),
      category: req.body.category,
      paidBy: req.body.paidBy,
      remarks: req.body.remarks,
      amount: req.body.amount,
      status: "To Submit",
      receipt: req.file ? req.file.filename : null,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
