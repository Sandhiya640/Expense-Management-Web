import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import ExpenseTransactions from "./pages/ExpenseTransaction";
import Dashboard from "./pages/Dashboard";
import Role from "./pages/Role";
import ExpenseType from "./pages/ExpenseType";
import Users from "./pages/Users";
import ExpenseCategory from "./pages/ExpenseCategory";
import LoanTransaction from "./pages/LoanTransaction";
<<<<<<< Updated upstream
import IncomeType from "./pages/IncomeType";
import IncomeTransactions from "./pages/IncomeTransactions"
=======
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="roles" element={<Role />} />

          <Route path="users" element={<Users />} />

          <Route path="expense-category" element={<ExpenseCategory />} />

          <Route path="expense-type" element={<ExpenseType />} />

<<<<<<< Updated upstream
          <Route path="income-type" element={<IncomeType />} />
=======
          {/* <Route path="expense" element={<Expense />} /> */}
>>>>>>> Stashed changes

          <Route path="income-transactions" element={<IncomeTransactions />} />
          <Route path="expense" element={<ExpenseTransactions />} />
          <Route path="/loan-transaction" element={<LoanTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
