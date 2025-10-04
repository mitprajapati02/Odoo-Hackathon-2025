import express from "express";

const router = express.Router();

router.post("/companies/:id/users", (req, res) => {
  res.send(`Create a new user in company with ID ${req.params.id}`);
});

router.patch("/users/:id/role", (req, res) => {
  res.send(`Update role for user with ID ${req.params.id}`);
});

router.patch("/users/:id/manager", (req, res) => {
  res.send(`Assign manager for user with ID ${req.params.id}`);
});

router.get("/companies/:id/users", (req, res) => {
  res.send(`Get all users in company with ID ${req.params.id}`);
});

export default router;
