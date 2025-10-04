const express = require("express");
const Expense = require("../models/expense");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Submit Expense (Employee)
router.post("/", auth(["Employee"]), async (req, res) => {
  try {
    const { amount, currency, category, description, date } = req.body;
    const expense = new Expense({
      employeeId: req.user.id,
      companyId: req.user.companyId,
      amount, currency, category, description, date
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// View own expenses (Employee)
router.get("/mine", auth(["Employee"]), async (req, res) => {
  const expenses = await Expense.find({ employeeId: req.user.id });
  res.json(expenses);
});

// Pending approvals (Manager/Admin)
router.get("/pending", auth(["Manager", "Admin"]), async (req, res) => {
  const expenses = await Expense.find({ "approvalFlow.approverId": req.user.id, "approvalFlow.status": "Pending" });
  res.json(expenses);
});

// Approve/Reject (Manager/Admin)
router.patch("/:id/approve", auth(["Manager", "Admin"]), async (req, res) => {
  const { status, comments } = req.body;
  const expense = await Expense.findById(req.params.id);
  
  const step = expense.approvalFlow.find(a => a.approverId.toString() === req.user.id);
  if (step) {
    step.status = status;
    step.comments = comments;
    await expense.save();
  }

  res.json(expense);
});

module.exports = router;
