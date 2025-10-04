import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import socialMediaRoutes from "./routes/socialMediaRoutes.js";
// import reminderRoutes from "./routes/reminderRoutes.js";
// import todoListRoutes from "./routes/todoListRoutes.js";

const app = express();

app.use(cors());
// Allow frontend to access JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.use("/api/auth", authRoutes);

// app.use("/api/user", userRoutes);

// app.use("/api/social", socialMediaRoutes);

// app.use("/api/reminder", reminderRoutes);

// app.use("/api/todo", todoListRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
