import React, { useState } from "react";
import "./IncomeTransactions.css";
import { FaSave, FaEdit, FaSearch, FaUpload } from "react-icons/fa";

function IncomeTransactions() {
  const [activeTab, setActiveTab] = useState("single");

  const [records, setRecords] = useState([
    {
      id: 1,
      incomeType: "Salary",
      amount: 50000,
      incomeDate: "01-05-2026",
      remarks: "Monthly Salary",
    },
    {
      id: 2,
      incomeType: "Freelancing",
      amount: 12000,
      incomeDate: "03-05-2026",
      remarks: "Freelancing Project",
    },
    {
      id: 3,
      incomeType: "Business Profit",
      amount: 30000,
      incomeDate: "05-05-2026",
      remarks: "Business Profit",
    },
  ]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    incomeType: "Salary",
    amount: "",
    incomeDate: "",
    remarks: "",
  });

  // Convert yyyy-mm-dd -> dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  // Convert dd-mm-yyyy -> yyyy-mm-dd (for input field)
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

    const formattedDate = formatDate(formData.incomeDate);

    if (editId) {
      const updated = records.map((rec) =>
        rec.id === editId
          ? { ...formData, incomeDate: formattedDate, id: editId }
          : rec,
      );
      setRecords(updated);
      setEditId(null);
    } else {
      const newRecord = {
        id: records.length + 1,
        ...formData,
        incomeDate: formattedDate,
      };
      setRecords([...records, newRecord]);
    }

    setFormData({
      incomeType: "Salary",
      amount: "",
      incomeDate: "",
      remarks: "",
    });
  };

  const handleEdit = (record) => {
    setActiveTab("single");
    setEditId(record.id);

    setFormData({
      incomeType: record.incomeType,
      amount: record.amount,
      incomeDate: reverseDate(record.incomeDate),
      remarks: record.remarks,
    });
  };

  const filteredRecords = records.filter((record) =>
    record.incomeType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="income-page">
      <div className="income-header">
        <h2>Income Transactions</h2>
      </div>

      {/* Tabs */}
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

      {/* SINGLE ENTRY */}
      {activeTab === "single" && (
        <div className="income-card">
          <div className="card-header">
            <h3>{editId ? "Edit Income Entry" : "Add Income Entry"}</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>INCOME TYPE</label>
                <select
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                >
                  <option>Salary</option>
                  <option>Freelancing</option>
                  <option>Business Profit</option>
                  <option>Rental Income</option>
                  <option>Bonus</option>
                </select>
              </div>

              <div className="form-group">
                <label>AMOUNT (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>INCOME DATE</label>
                <input
                  type="date"
                  name="incomeDate"
                  value={formData.incomeDate}
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
              <button type="reset" className="reset-btn">
                Reset
              </button>

              <button type="submit" className="save-btn">
                <FaSave /> {editId ? "Update" : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BULK */}
      {activeTab === "bulk" && (
        <div className="income-card">
          <div className="upload-box">
            <FaUpload size={40} />
            <h3>Bulk Upload Income Records</h3>
            <input type="file" />
          </div>
        </div>
      )}

      {/* RECORDS */}
      {activeTab === "records" && (
        <div className="income-card">
          <div className="table-top">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Income Type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>INCOME TYPE</th>
                <th>AMOUNT</th>
                <th>DATE</th>
                <th>REMARKS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.incomeType}</td>
                  <td>₹ {record.amount}</td>
                  <td>{record.incomeDate}</td>
                  <td>{record.remarks}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(record)}
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

export default IncomeTransactions;
