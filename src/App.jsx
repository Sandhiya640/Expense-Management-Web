import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Role from "./pages/Role";
import ExpenseType from "./pages/ExpenseType";
import Expense from "./pages/Expense";
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="roles"
            element={<Role />}
          />
          
          <Route
            path="expense-type"
            element={<ExpenseType />}
           />

          <Route
            path="expense"
            element={<Expense />}
           />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;