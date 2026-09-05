const express = require("express");

const router = express.Router();

const incomeTypeController = require("../Controllers/incomeTypeController");

router.get("/allIncomeTypes", incomeTypeController.getIncomeTypes);

router.post("/createIncomeType", incomeTypeController.addIncomeType);

router.put("/updateIncomeType/:id", incomeTypeController.updateIncomeType);

router.delete("/:id", incomeTypeController.deleteIncomeType);

module.exports = router;