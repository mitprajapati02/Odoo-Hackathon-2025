import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company.js";
import axios from "axios";

const router = express.Router();

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, country } = req.body;

    if (!name || !email || !password || !confirmPassword || !country)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await Company.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Fetch currency from API
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,currencies"
    );
    const countryData = response.data.find(
      (c) => c.name.common.toLowerCase() === country.toLowerCase()
    );
    const currency = countryData
      ? Object.keys(countryData.currencies || {})[0]
      : "N/A";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      country,
      currency,
    });

    await newCompany.save();

    const token = jwt.sign(
      { id: newCompany._id, email: newCompany.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      company: {
        id: newCompany._id,
        name: newCompany.name,
        email: newCompany.email,
        country: newCompany.country,
        currency: newCompany.currency,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await Company.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      company: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        currency: user.currency,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
