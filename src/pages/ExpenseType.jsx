import React, { useState } from "react";
import "./ExpenseType.css";

import {FaPlus,FaEdit,FaTimes,FaSave} from "react-icons/fa";

function ExpenseType() {

  const [showModal, setShowModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [expenseTypes, setExpenseTypes] =
    useState([
      {
        etId: 1,
        ecId: 1,
        expenseName: "Breakfast",
        status: "Active",
        createdBy: "Admin"
      },
      {
        etId: 2,
        ecId: 1,
        expenseName: "Lunch",
        status: "Active",
        createdBy: "Admin"
      },
      {
        etId: 3,
        ecId: 2,
        expenseName: "Bus Ticket",
        status: "Active",
        createdBy: "Admin"
      },
      {
        etId: 4,
        ecId: 2,
        expenseName: "Train Ticket",
        status: "Active",
        createdBy: "Admin"
      }
    ]);

  const [expenseName, setExpenseName] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [status, setStatus] =
    useState("Active");

  const saveExpenseType = () => {

    if (
      expenseName.trim() === "" ||
      categoryId === ""
    ) {
      alert("All fields required");
      return;
    }

    const newExpense = {
      etId: expenseTypes.length + 1,
      ecId: categoryId,
      expenseName,
      status,
      createdBy: "Admin"
    };

    setExpenseTypes([
      ...expenseTypes,
      newExpense
    ]);

    setExpenseName("");
    setCategoryId("");
    setStatus("Active");
    setShowModal(false);
  };

  const filteredExpenseTypes =
    expenseTypes.filter((item) =>
      item.expenseName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div className="expense-page">

      <div className="expense-card">

        <div className="card-header">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Expense Type..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            <FaPlus />
            Add Expense Type
          </button>

        </div>

        <table>

          <thead>
            <tr>
              <th>ET ID</th>
              <th>EC ID</th>
              <th>EXPENSE NAME</th>
              <th>STATUS</th>
              <th>CREATED BY</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {filteredExpenseTypes.map(
              (item) => (

              <tr key={item.etId}>

                <td>{item.etId}</td>
                <td>{item.ecId}</td>
                <td>{item.expenseName}</td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.createdBy}</td>

                <td>
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>Add Expense Type</h2>

              <FaTimes
                className="close-icon"
                onClick={() =>
                  setShowModal(false)
                }
              />

            </div>

            <div className="modal-body">

              <label>Category ID</label>

              <input
                type="number"
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
              />

              <label>Expense Name</label>

              <input
                type="text"
                value={expenseName}
                onChange={(e) =>
                  setExpenseName(e.target.value)
                }
              />

              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={saveExpenseType}
                >
                  <FaSave />
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ExpenseType;