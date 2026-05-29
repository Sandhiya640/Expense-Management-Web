import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Role from "./pages/Role";

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

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;