const express = require("express");
const router = express.Router();

const expenseTypeController =
require("../controllers/expenseTypeController");

router.get(
  "/allExpenseTypes",
  expenseTypeController.getExpenseTypes
);

router.post(
  "/createExpenseType",
  expenseTypeController.createExpenseType
);

router.put(
  "/updateExpenseType/:id",
  expenseTypeController.updateExpenseType
);

router.delete(
  "/:id",
  expenseTypeController.deleteExpenseType
);

module.exports = router;