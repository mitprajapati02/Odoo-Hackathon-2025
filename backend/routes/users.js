const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Create Employee/Manager (Admin only)
router.post("/", auth(["Admin"]), async (req, res) => {
  try {
    const { name, email, password, role, managerId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role, managerId, companyId: req.user.companyId });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update role
router.patch("/:id/role", auth(["Admin"]), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
