import React, { useState } from "react";
import "./ExpenseType.css";

import { FaPlus, FaEdit, FaTimes, FaSave } from "react-icons/fa";

function ExpenseType() {
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [expenseTypes, setExpenseTypes] = useState([
    {
      etId: 1,
      ecId: 1,
      expenseName: "Breakfast",
      status: "Active",
      createdBy: "Admin",
    },
    {
      etId: 2,
      ecId: 1,
      expenseName: "Lunch",
      status: "Active",
      createdBy: "Admin",
    },
    {
      etId: 3,
      ecId: 2,
      expenseName: "Bus Ticket",
      status: "Active",
      createdBy: "Admin",
    },
    {
      etId: 4,
      ecId: 2,
      expenseName: "Train Ticket",
      status: "Active",
      createdBy: "Admin",
    },
  ]);

  /* ---------- FORM STATES ---------- */

  const [editData, setEditData] = useState(null);

  const [editExpenseName, setEditExpenseName] = useState("");

  const [editCategoryId, setEditCategoryId] = useState("");

  const [editStatus, setEditStatus] = useState("Active");

  /* ---------- OPEN ADD MODAL ---------- */

  const openAddModal = () => {
    setEditData(null);

    setEditExpenseName("");

    setEditCategoryId("");

    setEditStatus("Active");

    setShowModal(true);
  };

  /* ---------- OPEN EDIT MODAL ---------- */

  const handleEdit = (item) => {
    setEditData(item);

    setEditExpenseName(item.expenseName);

    setEditCategoryId(item.ecId);

    setEditStatus(item.status);

    setShowModal(true);
  };

  /* ---------- SAVE ---------- */

  const saveExpenseType = () => {
    if (editExpenseName.trim() === "" || editCategoryId === "") {
      alert("All fields required");
      return;
    }

    /* ---------- UPDATE ---------- */

    if (editData) {
      const updatedList = expenseTypes.map((item) =>
        item.etId === editData.etId
          ? {
              ...item,
              ecId: editCategoryId,
              expenseName: editExpenseName,
              status: editStatus,
            }
          : item,
      );

      setExpenseTypes(updatedList);
    } else {
      /* ---------- ADD ---------- */

      const newExpense = {
        etId: expenseTypes.length + 1,
        ecId: editCategoryId,
        expenseName: editExpenseName,
        status: editStatus,
        createdBy: "Admin",
      };

      setExpenseTypes([...expenseTypes, newExpense]);
    }

    setShowModal(false);

    setEditData(null);

    setEditExpenseName("");

    setEditCategoryId("");

    setEditStatus("Active");
  };

  /* ---------- SEARCH ---------- */

  const filteredExpenseTypes = expenseTypes.filter((item) =>
    item.expenseName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="expense-page">
      {/* ---------- HEADER ---------- */}

      <div className="expense-header">
        <h2>ExpenseType Management</h2>
      </div>

      {/* ---------- CARD ---------- */}

      <div className="expense-card">
        {/* ---------- TOP BAR ---------- */}

        <div className="card-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Expense Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add Expense Type
          </button>
        </div>

        {/* ---------- TABLE ---------- */}

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
            {filteredExpenseTypes.map((item) => (
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
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MODAL ---------- */}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* ---------- MODAL HEADER ---------- */}

            <div className="modal-header">
              <h2>{editData ? "Edit Expense Type" : "Add Expense Type"}</h2>

              <FaTimes
                className="close-icon"
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
              />
            </div>

            {/* ---------- MODAL BODY ---------- */}

            <div className="modal-body">
              <label>Category ID</label>

              <input
                type="number"
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(e.target.value)}
              />

              <label>Expense Name</label>

              <input
                type="text"
                value={editExpenseName}
                onChange={(e) => setEditExpenseName(e.target.value)}
              />

              <label>Status</label>

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              {/* ---------- BUTTONS ---------- */}

              <div className="modal-buttons">
                <button className="save-btn" onClick={saveExpenseType}>
                  <FaSave />
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditData(null);
                  }}
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
