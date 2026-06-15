import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import Role from "./pages/Role";
import Users from "./pages/Users";
import ExpenseCategory from "./pages/ExpenseCategory";
import ExpenseType from "./pages/ExpenseType";
import IncomeType from "./pages/IncomeType";
import IncomeTransactions from "./pages/IncomeTransactions";
import ExpenseTransactions from "./pages/ExpenseTransaction";
import LoanTransaction from "./pages/LoanTransaction";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/users" element={<Users />} />
          <Route path="/expense-category" element={<ExpenseCategory />} />
          <Route path="/expense-type" element={<ExpenseType />} />
          <Route path="/income-type" element={<IncomeType />} />
          <Route path="/income-transactions" element={<IncomeTransactions />} />
          <Route path="/expense" element={<ExpenseTransactions />} />
          <Route path="/loan-transaction" element={<LoanTransaction />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
