import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ApprovalsRoutes from "./routes/ApprovalsRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import RulesRoutes from "./routes/RulesRoutes.js";
import ReceiptsRoutes from "./routes/ReceiptsRoutes.js";
import UtilitiesRoutes from "./routes/UtilitiesRoutes.js";
import fs from 'fs';


const app = express();

app.use(cors());
// Allow frontend to access JSON data
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/approvals", ApprovalsRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/rules", RulesRoutes);

app.use("/api/receipts", ReceiptsRoutes);

app.use("/api/utilities", UtilitiesRoutes);

const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
