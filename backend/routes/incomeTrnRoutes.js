const express = require("express");

const router = express.Router();

const incomeTrnController = require("../Controllers/incomeTrnController");

router.get("/", incomeTrnController.getIncomeRecords);

router.get("/income-types", incomeTrnController.getIncomeTypes);

router.get("/user/:empCode", incomeTrnController.getUserByEmpCode);

router.post("/", incomeTrnController.addIncome);

router.put("/:id", incomeTrnController.updateIncome);

router.delete("/:id", incomeTrnController.deleteIncome);

router.post("/bulk", incomeTrnController.bulkUploadIncome);

module.exports = router;