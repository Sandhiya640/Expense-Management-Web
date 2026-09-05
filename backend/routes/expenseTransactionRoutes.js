const express = require("express");

const router = express.Router();

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  bulkUploadExpense,
} = require("../controllers/expenseTransactionController"); 

router.get("/", getExpenses);

router.post("/bulk", bulkUploadExpense);

router.get("/:id", getExpenseById);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);


module.exports = router;