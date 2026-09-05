

const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanTrnController");

router.get("/", loanController.getLoans);
router.get("/:id", loanController.getLoanById);
router.post("/", loanController.createLoan);
router.put("/:id", loanController.updateLoan);

module.exports = router;