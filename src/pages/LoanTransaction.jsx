import React, { useState } from "react";
import "./LoanTransaction.css";
import { FaSave, FaEdit, FaSearch } from "react-icons/fa";

function LoanTransaction() {
  const [activeTab, setActiveTab] = useState("single");
  const [editId, setEditId] = useState(null);

  const [records, setRecords] = useState([
    {
      loanId: 1,
      loanCategory: "Personal",
      bankType: "SBI",
      loanAmount: 5000,
      interestRate: 5,
      loanDate: "2026-06-01",
      tenureMonths: 1,
      dueDate: "2026-07-01",
      balance: 5000,
      status: "Active",
      createdBy: "Admin",
    },
  ]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    loanCategory: "",
    bankType: "",
    loanAmount: "",
    interestRate: "",
    loanDate: "",
    tenureMonths: "",
    dueDate: "",
    balance: "",
    status: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const calculateDueDate = (loanDate, months) => {
    if (!loanDate || !months) return "";
    const d = new Date(loanDate);
    d.setMonth(d.getMonth() + Number(months));
    return d.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...formData, [name]: value };

    if (name === "loanAmount") {
      updated.balance = value;
    }

    if (name === "loanDate" || name === "tenureMonths") {
      updated.dueDate = calculateDueDate(
        name === "loanDate" ? value : updated.loanDate,
        name === "tenureMonths" ? value : updated.tenureMonths,
      );
    }

    setFormData(updated);
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      loanCategory: "",
      loanAmount: "",
      interestRate: "",
      loanDate: "",
      tenureMonths: "",
      dueDate: "",
      balance: "",
      status: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanData = {
      loanCategory: formData.loanCategory,
      bankType: formData.bankType,
      loanAmount: formData.loanAmount,
      interestRate: formData.interestRate,
      loanDate: formData.loanDate,
      tenureMonths: formData.tenureMonths,
      dueDate: formData.dueDate,
      balance: formData.loanAmount,
      status: formData.status,
    };

    if (editId) {
      setRecords(
        records.map((r) => (r.loanId === editId ? { ...r, ...loanData } : r)),
      );
    } else {
      setRecords([
        ...records,
        {
          loanId: records.length + 1,
          ...loanData,
          createdBy: "Admin",
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setActiveTab("single");
    setEditId(item.loanId);
    setFormData({
      loanCategory: item.loanCategory,
      bankType: item.bankType,
      loanAmount: item.loanAmount,
      interestRate: item.interestRate,
      loanDate: item.loanDate,
      tenureMonths: item.tenureMonths,
      dueDate: item.dueDate,
      balance: item.balance,
      status: item.status,
    });
  };

  const filteredRecords = records.filter((r) =>
    r.loanCategory.toLowerCase().includes(search.toLowerCase()),
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
          className={activeTab === "records" ? "active" : ""}
          onClick={() => setActiveTab("records")}
        >
          All Records
        </button>
      </div>

      {activeTab === "single" && (
        <div className="expense-card">
          <form onSubmit={handleSubmit}>
            <div className="loan-form">
              <div className="form-row">
                <label>LOAN CATEGORY :</label>

                <select
                  name="loanCategory"
                  value={formData.loanCategory}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Education">Education</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Home">Home</option>
                  <option value="Business">Business</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div className="form-row">
                <label>BANK TYPE :</label>

                <select
                  name="bankType"
                  value={formData.bankType}
                  onChange={handleChange}
                >
                  <option value="">Select Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="ICICI">ICICI</option>
                  <option value="Axis">Axis</option>
                  <option value="Canara">Canara</option>
                  <option value="Indian Bank">Indian Bank</option>
                </select>
              </div>

              <div className="form-row">
                <label>LOAN AMOUNT :</label>

                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>INTEREST RATE :</label>

                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>LOAN DATE :</label>

                <input
                  type="date"
                  name="loanDate"
                  value={formData.loanDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>TENURE MONTHS :</label>

                <input
                  type="number"
                  name="tenureMonths"
                  value={formData.tenureMonths}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>DUE DATE :</label>

                <input
                  type="text"
                  value={formatDate(formData.dueDate)}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label>BALANCE :</label>

                <input type="number" value={formData.balance} readOnly />
              </div>

              <div className="form-row">
                <label>STATUS :</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="action-buttons">
              <button type="button" className="reset-btn" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="save-btn">
                <FaSave /> {editId ? "Update" : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "records" && (
        <div className="expense-card">
          <div className="search-box">
            <FaSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Loan Category..."
            />
          </div>
          <div className="summary-cards">
            <div className="summary-card">
              <h4>Total Records</h4>
              <p>{records.length}</p>
            </div>

            <div className="summary-card">
              <h4>Total Loan Amount</h4>
              <p>
                ₹{" "}
                {records.reduce(
                  (sum, item) => sum + Number(item.loanAmount),
                  0,
                )}
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>LOAN ID</th>
                <th>CATEGORY</th>
                <th>BANK TYPE</th>
                <th>AMOUNT</th>
                <th>INTEREST</th>
                <th>LOAN DATE</th>
                <th>TENURE</th>
                <th>DUE DATE</th>
                <th>BALANCE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.loanId}>
                  <td>{item.loanId}</td>
                  <td>{item.loanCategory}</td>
                  <td>{item.bankType}</td>
                  <td>₹ {item.loanAmount}</td>
                  <td>{item.interestRate}%</td>
                  <td>{formatDate(item.loanDate)}</td>
                  <td>{item.tenureMonths}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>₹ {item.balance}</td>
                  <td>{item.status}</td>
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
