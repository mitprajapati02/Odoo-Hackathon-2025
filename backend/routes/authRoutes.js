import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("User signup endpoint");
});
router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("User login endpoint");
});

export default router;
