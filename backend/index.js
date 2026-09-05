console.log("START index.js");

const express = require("express");
console.log("Express loaded");

const cors = require("cors");
console.log("Cors loaded");

const roleRoutes = require("./routes/roleRoutes");
console.log("roleRoutes loaded");

const userRoutes = require("./routes/userRoutes");
console.log("userRoutes loaded");

const expenseCategoryRoutes = require("./routes/expenseCategoryRoutes");
console.log("expenseCategoryRoutes loaded");

const expenseTypeRoutes = require("./routes/expenseTypeRoutes");
console.log("expenseTypeRoutes loaded");

const incomeTypeRoutes = require("./routes/incomeTypeRoutes");
console.log("incomeTypeRoutes loaded");

const expenseTransactionRoutes =
  require("./routes/expenseTransactionRoutes");
console.log("expenseTransactionRoutes loaded");

const incomeTrnRoutes = require("./routes/incomeTrnRoutes");
console.log("incomeTrnRoutes loaded");

const loanTrnRoutes = require("./routes/loanTrnRoutes");
console.log("loanTrnRoutes loaded");

const reportRoutes = require("./routes/reportRoutes");
console.log("reportRoutes loaded");

const dashboardRoutes = require("./routes/dashboardRoutes");
console.log("dashboardRoutes loaded");

console.log("All routes loaded");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expense-categories", expenseCategoryRoutes);
app.use("/api/expense-types", expenseTypeRoutes);
app.use("/api/income-types", incomeTypeRoutes);
app.use("/api/expense-transactions", expenseTransactionRoutes);
app.use("/api/income-trn", incomeTrnRoutes);
app.use("/api/loans", loanTrnRoutes);
app.use("/api/dashboard", dashboardRoutes);

console.log("Routes registered");

app.listen(5001, () => {
  console.log("Server Running on Port 5001");
});

console.log("app.listen called");

const { poolPromise } = require("./config/db");

poolPromise
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err);
  });