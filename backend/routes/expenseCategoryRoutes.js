
const express = require("express");

const router = express.Router();

const expenseCategoryController =
    require("../Controllers/expenseCategoryController");

router.get(
    "/allCategories",
    expenseCategoryController.getExpenseCategories
);

router.get(
    "/:id",
    expenseCategoryController.getExpenseCategoryById
);

router.post(
    "/addCategory",
    expenseCategoryController.addExpenseCategory
);

router.put(
    "/updateCategory/:id",
    expenseCategoryController.updateExpenseCategory
);

router.delete(
    "/:id",
    expenseCategoryController.deleteExpenseCategory
);

module.exports = router;