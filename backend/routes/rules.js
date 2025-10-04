const express = require("express");
const Rule = require("../models/rule");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create/Update rules (Admin)
router.post("/", auth(["Admin"]), async (req, res) => {
  const { percentageRule, specificApprovers, hybrid } = req.body;
  let rule = await Rule.findOne({ companyId: req.user.companyId });
  
  if (rule) {
    rule.percentageRule = percentageRule;
    rule.specificApprovers = specificApprovers;
    rule.hybrid = hybrid;
    await rule.save();
  } else {
    rule = new Rule({ companyId: req.user.companyId, percentageRule, specificApprovers, hybrid });
    await rule.save();
  }
  res.json(rule);
});

// Get rules
router.get("/", auth(["Admin", "Manager"]), async (req, res) => {
  const rule = await Rule.findOne({ companyId: req.user.companyId });
  res.json(rule);
});

module.exports = router;
