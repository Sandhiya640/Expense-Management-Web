import React, { useState } from "react";
import "./IncomeTransactions.css";
import {
  FaSave,
  FaEdit,
  FaSearch,
  FaUpload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [formData, setFormData] = useState({
    incomeType: "Salary",
    amount: "",
    incomeDate: "",
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

  const monthlyRecords = records.filter((item) => {
    if (!selectedMonth) return true;
    const [day, month, year] = item.incomeDate.split("-");
    return `${year}-${month}` === selectedMonth;
  });

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
    setShowAddModal(true);
  };

  const filteredRecords = records.filter((record) =>
    record.incomeType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="income-page">
        <div className="income-header">
          <h2>Income Transactions</h2>
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
          <div className="income-card">
            <div className="card-header">
              <h3>Monthly Income Records</h3>
              <button className="add-btn" onClick={() => setShowAddModal(true)}>
                <FaPlus />
                Add Income
              </button>
            </div>

            <div className="month-filter">
              <label>Select Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
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
                  {monthlyRecords.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.incomeType}</td>
                      <td>₹ {item.amount}</td>
                      <td>{item.incomeDate}</td>
                      <td>{item.remarks}</td>
                      <td>
                        <button
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
          </div>
        )}

        {activeTab === "bulk" && (
          <div className="income-card">
            <div className="upload-box">
              <FaUpload size={40} />
              <h3>Bulk Upload Income Records</h3>
              <input type="file" />
            </div>
          </div>
        )}

        {activeTab === "records" && (
          <div className="income-card">
            <div className="records-header">

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

            <div className="summary-cards">
              <div className="summary-card">
                <h4>Total Records</h4>
                <p>{records.length}</p>
              </div>

              <div className="summary-card">
                <h4>Total Income</h4>
                <p>
                  ₹{" "}
                  {records.reduce((sum, item) => sum + Number(item.amount), 0)}
                </p>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Income Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Remarks</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>{editId ? "Edit Income" : "Add Income"}</h3>
              <FaTimes
                onClick={() => {
                  setShowAddModal(false);
                  setEditId(null);
                  setFormData({
                    incomeType: "Salary",
                    amount: "",
                    incomeDate: "",
                    remarks: "",
                  });
                }}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Income Type :</label>
                <select
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                >
                  <option>Salary</option>
                  <option>Freelancing</option>
                  <option>Business Profit</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount :</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Date :</label>
                <input
                  type="date"
                  name="incomeDate"
                  value={formData.incomeDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Remarks :</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditId(null);
                  setFormData({
                    incomeType: "Salary",
                    amount: "",
                    incomeDate: "",
                    remarks: "",
                  });
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={(e) => {
                  handleSubmit(e);
                  setShowAddModal(false);
                }}
              >
                <FaSave />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IncomeTransactions;
