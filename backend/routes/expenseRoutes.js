//enpenseRounts.js

const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ userId: req.userId, title, amount });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Error adding expense" });
  }
});

// Get User Expenses
router.get("/", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

module.exports = router;
