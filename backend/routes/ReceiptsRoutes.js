import express from "express";

const router = express.Router();

router.get("/reminder/:appId", (req, res) => {
  res.send("Get all reminders by appId");
});

router.post("/add", (req, res) => {
  res.send("Add a new reminder");
});

export default router;
