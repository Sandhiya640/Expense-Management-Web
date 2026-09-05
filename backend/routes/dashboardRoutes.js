const express = require("express");

const router = express.Router();

const dashboardController =
require("../controllers/dashboardController");

router.get(
  "/dashboardData",
  dashboardController.getDashboardData
);

module.exports = router;