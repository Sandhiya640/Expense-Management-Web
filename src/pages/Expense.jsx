import React, { useState } from "react";
import "./Expense.css";

import { FaPlus, FaEdit, FaTimes, FaSave } from "react-icons/fa";

function Expense() {
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [expenses, setExpenses] = useState([
    {
      expId: 1,
      etId: 1,
      expValue: 120.5,
      expDate: "2026-05-01",
      remarks: "Breakfast Expense",
      createdBy: "Admin",
    },
    {
      expId: 2,
      etId: 2,
      expValue: 250,
      expDate: "2026-05-02",
      remarks: "Lunch Expense",
      createdBy: "Admin",
    },
    {
      expId: 3,
      etId: 3,
      expValue: 80,
      expDate: "2026-05-03",
      remarks: "Bus Travel",
      createdBy: "Admin",
    },
    {
      expId: 4,
      etId: 4,
      expValue: 450,
      expDate: "2026-05-04",
      remarks: "Train Ticket Booking",
      createdBy: "Admin",
    },
  ]);

  /* ---------- FORM STATES ---------- */

  const [editData, setEditData] = useState(null);

  const [etId, setEtId] = useState("");

  const [expValue, setExpValue] = useState("");

  const [expDate, setExpDate] = useState("");

  const [remarks, setRemarks] = useState("");

  /* ---------- OPEN ADD MODAL ---------- */

  const openAddModal = () => {
    setEditData(null);

    setEtId("");

    setExpValue("");

    setExpDate("");

    setRemarks("");

    setShowModal(true);
  };

  /* ---------- OPEN EDIT MODAL ---------- */

  const handleEdit = (item) => {
    setEditData(item);

    setEtId(item.etId);

    setExpValue(item.expValue);

    setExpDate(item.expDate);

    setRemarks(item.remarks);

    setShowModal(true);
  };

  /* ---------- SAVE ---------- */

  const saveExpense = () => {
    if (!etId || !expValue || !expDate || !remarks) {
      alert("All fields are required");
      return;
    }

    /* ---------- UPDATE ---------- */

    if (editData) {
      const updatedExpenses = expenses.map((item) =>
        item.expId === editData.expId
          ? {
              ...item,
              etId,
              expValue,
              expDate,
              remarks,
            }
          : item,
      );

      setExpenses(updatedExpenses);
    } else {
      /* ---------- ADD ---------- */

      const newExpense = {
        expId: expenses.length + 1,
        etId,
        expValue,
        expDate,
        remarks,
        createdBy: "Admin",
      };

      setExpenses([...expenses, newExpense]);
    }

    setEtId("");

    setExpValue("");

    setExpDate("");

    setRemarks("");

    setEditData(null);

    setShowModal(false);
  };

  /* ---------- SEARCH ---------- */

  const filteredExpenses = expenses.filter((item) =>
    item.remarks.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="expense-page">
      {/* ---------- HEADER ---------- */}

      <div className="expense-header">
        <h2>Expense Management</h2>
      </div>

      {/* ---------- CARD ---------- */}

      <div className="expense-card">
        {/* ---------- CARD HEADER ---------- */}

        <div className="card-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add Expense
          </button>
        </div>

        {/* ---------- TABLE ---------- */}

        <table>
          <thead>
            <tr>
              <th>EXP ID</th>
              <th>ET ID</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>REMARKS</th>
              <th>CREATED BY</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((item) => (
              <tr key={item.expId}>
                <td>{item.expId}</td>

                <td>{item.etId}</td>

                <td>₹ {item.expValue}</td>

                <td>{item.expDate}</td>

                <td>{item.remarks}</td>

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
              <h2>{editData ? "Edit Expense" : "Add Expense"}</h2>

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
              <label>Expense Type ID</label>

              <input
                type="number"
                value={etId}
                onChange={(e) => setEtId(e.target.value)}
              />

              <label>Amount</label>

              <input
                type="number"
                value={expValue}
                onChange={(e) => setExpValue(e.target.value)}
              />

              <label>Date</label>

              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />

              <label>Remarks</label>

              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />

              {/* ---------- BUTTONS ---------- */}

              <div className="modal-buttons">
                <button className="save-btn" onClick={saveExpense}>
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

export default Expense;
