import React, { useState } from "react";
import "./ExpenseTransaction.css";
import { FaSave, FaEdit, FaSearch, FaUpload } from "react-icons/fa";

function ExpenseTransactions() {
  const [activeTab, setActiveTab] = useState("single");
  const [editId, setEditId] = useState(null);
  const [records, setRecords] = useState([
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

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    etId: "",
    expValue: "",
    expDate: "",
    remarks: "",
  });
  const formatDate = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const reverseDate = (date) => {
    if (!date) return "";

    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (editId) {
    const updatedRecords = records.map((item) =>
      item.expId === editId
        ? {
            ...item,
            etId: formData.etId,
            expValue: formData.expValue,
            expDate: formData.expDate,
            remarks: formData.remarks,
          }
        : item,
    );

    setRecords(updatedRecords);
    setEditId(null);
  } else {
    const newExpense = {
      expId: records.length + 1,
      etId: formData.etId,
      expValue: formData.expValue,
      expDate: formData.expDate,
      remarks: formData.remarks,
      createdBy: "Admin",
    };

    setRecords([...records, newExpense]);
  }

  setFormData({
    etId: "",
    expValue: "",
    expDate: "",
    remarks: "",
  });
};
const handleEdit = (item) => {
  setActiveTab("single");
  setEditId(item.expId);

  setFormData({
    etId: item.etId,
    expValue: item.expValue,
    expDate: item.expDate,
    remarks: item.remarks,
  });
};
  const filteredRecords = records.filter((item) =>
    item.remarks.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="expense-page">
      <div className="expense-header">
        <h2>Expense Transactions</h2>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "single" ? "active" : ""}
          onClick={() => setActiveTab("single")}
        >
          Single Entry
        </button>

        <button
          className={activeTab === "bulk" ? "active" : ""}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Upload
        </button>

        <button
          className={activeTab === "records" ? "active" : ""}
          onClick={() => setActiveTab("records")}
        >
          All Records
        </button>
      </div>

      {activeTab === "single" && (
        <div className="expense-card">
          <div className="card-header">
            <h3>{editId ? "Edit Expense Entry" : "Add Expense Entry"}</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>EXPENSE TYPE ID</label>

                <select
                  name="etId"
                  value={formData.etId}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="1">Food</option>
                  <option value="2">Travel</option>
                  <option value="3">Medical</option>
                  <option value="4">Shopping</option>
                  <option value="5">Rent</option>
                  <option value="6">Electricity</option>
                </select>
              </div>

              <div className="form-group">
                <label>AMOUNT (₹)</label>

                <input
                  type="number"
                  name="expValue"
                  placeholder="0.00"
                  value={formData.expValue}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>EXPENSE DATE</label>

                <input
                  type="date"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                />
              </div>

              <div></div>

              <div className="form-group full-width">
                <label>REMARKS</label>

                <textarea
                  name="remarks"
                  placeholder="Optional notes..."
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="reset-btn"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    etId: "",
                    expValue: "",
                    expDate: "",
                    remarks: "",
                  });
                }}
              >
                Reset
              </button>
              <button type="submit" className="save-btn">
                <FaSave />
                {editId ? " Update" : " Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "bulk" && (
        <div className="expense-card">
          <div className="upload-box">
            <FaUpload size={40} />

            <h3>Bulk Upload Expense Records</h3>

            <input type="file" />
          </div>
        </div>
      )}

      {activeTab === "records" && (
        <div className="expense-card">
          <div className="table-top">
            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search Remarks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>EXP_ID</th>
                <th>ET_ID</th>
                <th>AMOUNT</th>
                <th>DATE</th>
                <th>REMARKS</th>
                <th>CREATED BY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.expId}>
                  <td>{item.expId}</td>
                  <td>{item.etId}</td>
                  <td>₹ {item.expValue}</td>
                  <td>{formatDate(item.expDate)}</td>
                  <td>{item.remarks}</td>
                  <td>{item.createdBy}</td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseTransactions;
