import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("User signup endpoint");
});
router.post("/login", (req, res) => {
  res.send("User login endpoint");
});

export default router;
