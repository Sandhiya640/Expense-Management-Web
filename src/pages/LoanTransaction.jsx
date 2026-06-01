import React, { useState } from "react";
import "./LoanTransaction.css";
import { FaSave, FaEdit, FaSearch, FaUpload } from "react-icons/fa";

function LoanTransaction() {
  const [activeTab, setActiveTab] = useState("single");
  const [editId, setEditId] = useState(null);

  const [records, setRecords] = useState([
    {
      loanId: 1,
      ecId: 1,
      trnType: "Get",
      loanValue: 5000,
      remarks: "Personal Food Loan",
      createdBy: "Admin",
    },
    {
      loanId: 2,
      ecId: 2,
      trnType: "Get",
      loanValue: 10000,
      remarks: "Travel Loan",
      createdBy: "Admin",
    },
    {
      loanId: 3,
      ecId: 3,
      trnType: "RePay",
      loanValue: 2000,
      remarks: "Shopping Loan Repayment",
      createdBy: "Admin",
    },
  ]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    ecId: "",
    trnType: "",
    loanValue: "",
    remarks: "",
  });

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
        item.loanId === editId
          ? {
              ...item,
              ecId: formData.ecId,
              trnType: formData.trnType,
              loanValue: formData.loanValue,
              remarks: formData.remarks,
            }
          : item,
      );

      setRecords(updatedRecords);
      setEditId(null);
    } else {
      const newLoan = {
        loanId: records.length + 1,
        ecId: formData.ecId,
        trnType: formData.trnType,
        loanValue: formData.loanValue,
        remarks: formData.remarks,
        createdBy: "Admin",
      };

      setRecords([...records, newLoan]);
    }

    setFormData({
      ecId: "",
      trnType: "",
      loanValue: "",
      remarks: "",
    });
  };

  const handleEdit = (item) => {
    setActiveTab("single");
    setEditId(item.loanId);

    setFormData({
      ecId: item.ecId,
      trnType: item.trnType,
      loanValue: item.loanValue,
      remarks: item.remarks,
    });
  };

  const filteredRecords = records.filter((item) =>
    item.remarks.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="expense-page">
      <div className="expense-header">
        <h2>Loan Transactions</h2>
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
            <h3>{editId ? "Edit Loan Entry" : "Add Loan Entry"}</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>EXPENSE CATEGORY</label>

                <select
                  name="ecId"
                  value={formData.ecId}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="1">Food</option>
                  <option value="2">Travel</option>
                  <option value="3">Shopping</option>
                  <option value="4">Medical</option>
                  <option value="5">Education</option>
                </select>
              </div>

              <div className="form-group">
                <label>TRANSACTION TYPE</label>

                <select
                  name="trnType"
                  value={formData.trnType}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Get">Get</option>
                  <option value="RePay">RePay</option>
                </select>
              </div>

              <div className="form-group">
                <label>LOAN VALUE (₹)</label>

                <input
                  type="number"
                  name="loanValue"
                  value={formData.loanValue}
                  onChange={handleChange}
                />
              </div>

              <div></div>

              <div className="form-group full-width">
                <label>REMARKS</label>

                <textarea
                  name="remarks"
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
                    ecId: "",
                    trnType: "",
                    loanValue: "",
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
            <h3>Bulk Upload Loan Records</h3>
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
                <th>LOAN_ID</th>
                <th>EC_ID</th>
                <th>TRN_TYPE</th>
                <th>LOAN_VALUE</th>
                <th>REMARKS</th>
                <th>CREATED BY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.loanId}>
                  <td>{item.loanId}</td>
                  <td>{item.ecId}</td>
                  <td>{item.trnType}</td>
                  <td>₹ {item.loanValue}</td>
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

export default LoanTransaction;
