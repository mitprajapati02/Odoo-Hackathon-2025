const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");

const router = express.Router();

// Signup → Creates Company + Admin User
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, companyName, country, currency } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin User
    const adminUser = new User({ name, email, password: hashedPassword, role: "Admin" });
    await adminUser.save();

    // Create Company
    const company = new Company({ name: companyName, country, currency, adminId: adminUser._id });
    await company.save();

    adminUser.companyId = company._id;
    await adminUser.save();

    res.json({ msg: "Company and Admin created", adminUser, company });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role, companyId: user.companyId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
