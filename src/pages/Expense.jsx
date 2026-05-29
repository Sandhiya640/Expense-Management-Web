import React, { useState } from "react";
import "./Expense.css";

import {
  FaPlus,
  FaEdit,
  FaTimes,
  FaSave
} from "react-icons/fa";

function Expense() {

  const [showModal, setShowModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [expenses, setExpenses] =
    useState([
      {
        expId: 1,
        etId: 1,
        expValue: 120.50,
        expDate: "2026-05-01",
        remarks: "Breakfast Expense",
        createdBy: "Admin"
      },
      {
        expId: 2,
        etId: 2,
        expValue: 250.00,
        expDate: "2026-05-02",
        remarks: "Lunch Expense",
        createdBy: "Admin"
      },
      {
        expId: 3,
        etId: 3,
        expValue: 80.00,
        expDate: "2026-05-03",
        remarks: "Bus Travel",
        createdBy: "Admin"
      },
      {
        expId: 4,
        etId: 4,
        expValue: 450.00,
        expDate: "2026-05-04",
        remarks: "Train Ticket Booking",
        createdBy: "Admin"
      }
    ]);

  const [etId, setEtId] = useState("");
  const [expValue, setExpValue] = useState("");
  const [expDate, setExpDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const saveExpense = () => {

    if (
      !etId ||
      !expValue ||
      !expDate ||
      !remarks
    ) {
      alert("All fields are required");
      return;
    }

    const newExpense = {
      expId: expenses.length + 1,
      etId,
      expValue,
      expDate,
      remarks,
      createdBy: "Admin"
    };

    setExpenses([...expenses, newExpense]);

    setEtId("");
    setExpValue("");
    setExpDate("");
    setRemarks("");

    setShowModal(false);
  };

  const filteredExpenses =
    expenses.filter((item) =>
      item.remarks
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
              placeholder="Search Expenses..."
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
            Add Expense
          </button>

        </div>

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

            {filteredExpenses.map(
              (item) => (
                <tr key={item.expId}>

                  <td>{item.expId}</td>
                  <td>{item.etId}</td>
                  <td>₹ {item.expValue}</td>
                  <td>{item.expDate}</td>
                  <td>{item.remarks}</td>
                  <td>{item.createdBy}</td>

                  <td>
                    <button className="edit-btn">
                      <FaEdit />
                    </button>
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>Add Expense</h2>

              <FaTimes
                className="close-icon"
                onClick={() =>
                  setShowModal(false)
                }
              />

            </div>

            <div className="modal-body">

              <label>Expense Type ID</label>

              <input
                type="number"
                value={etId}
                onChange={(e) =>
                  setEtId(e.target.value)
                }
              />

              <label>Amount</label>

              <input
                type="number"
                value={expValue}
                onChange={(e) =>
                  setExpValue(e.target.value)
                }
              />

              <label>Date</label>

              <input
                type="date"
                value={expDate}
                onChange={(e) =>
                  setExpDate(e.target.value)
                }
              />

              <label>Remarks</label>

              <input
                type="text"
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
              />

              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={saveExpense}
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

export default Expense;