import React, { useState, useEffect } from "react";
import "./ExpenseTransaction.css";
import {
  FaSave,
  FaEdit,
  FaSearch,
  FaUpload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
function ExpenseTransactions() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [categories, setCategories] = useState([]);

  const [newExpense, setNewExpense] = useState({
    expType: "",
    expCategory: "",
    expValue: "",
    expDate: "",
    remarks: "",
  });
  const [activeTab, setActiveTab] = useState("single");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("");

  const [hoveredItem, setHoveredItem] = useState(null);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/expense-categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const [records, setRecords] = useState([
    {
      expId: 1,
      expType: "Food",
      expCategory: "Breakfast",
      expValue: 120,
      expDate: "2026-05-01",
      remarks: "Breakfast Expense",
      createdBy: "Admin",
    },
    {
      expId: 2,
      expType: "Food",
      expCategory: "Lunch",
      expValue: 250,
      expDate: "2026-05-02",
      remarks: "Lunch Expense",
      createdBy: "Admin",
    },
    {
      expId: 3,
      expType: "Travel",
      expCategory: "Bus",
      expValue: 80,
      expDate: "2026-05-03",
      remarks: "Bus Travel",
      createdBy: "Admin",
    },
    {
      expId: 4,
      expType: "Travel",
      expCategory: "Train",
      expValue: 450,
      expDate: "2026-05-04",
      remarks: "Train Ticket",
      createdBy: "Admin",
    },
  ]);
  const handleAddExpense = () => {
    if (
      !newExpense.expCategory ||
      !newExpense.expValue ||
      !newExpense.expDate
    ) {
      alert("Please fill all fields");
      return;
    }

    const selectedCategory = categories.find(
      (c) => c.EC_ID === Number(newExpense.expCategory),
    );

    const expenseRecord = {
      expId: records.length + 1,
      expType: selectedCategory?.Expense_Type || "",
      expCategory: selectedCategory?.Expense_Type || "",
      expValue: Number(newExpense.expValue),
      expDate: newExpense.expDate,
      remarks: newExpense.remarks,
      createdBy: "Admin",
    };

    setRecords([...records, expenseRecord]);

    setNewExpense({
      expType: "",
      expCategory: "",
      expValue: "",
      expDate: "",
      remarks: "",
    });

    setShowAddModal(false);
  };

  const [formData, setFormData] = useState({
    expType: "",
    expCategory: "",
    expValue: "",
    expDate: "",
    remarks: "",
  });

  const formatDate = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "expType") {
      setFormData({
        ...formData,
        expType: value,
        expCategory: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.expId);

    setFormData({
      expType: item.expType,
      expCategory: item.expCategory,
      expValue: item.expValue,
      expDate: item.expDate,
      remarks: item.remarks,
    });

    setShowEditModal(true);
  };

  const handleReset = () => {
    setEditId(null);

    setFormData({
      expType: "",
      expCategory: "",
      expValue: "",
      expDate: "",
      remarks: "",
    });
  };

  const monthlyRecords = records.filter((item) => {
    if (!selectedMonth) return true;

    return item.expDate.substring(0, 7) === selectedMonth;
  });

  const filteredRecords = records.filter((item) =>
    item.expType.toLowerCase().includes(search.toLowerCase()),
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
            <h3>Monthly Expense Records</h3>

            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <FaPlus />
              Add Expense
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
                  <th>EXP ID</th>
                  <th>EXPENSE TYPE</th>
                  <th>EXPENSE CATEGORY</th>
                  <th>AMOUNT</th>
                  <th>REMARKS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {monthlyRecords.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  monthlyRecords.map((item) => (
                    <tr key={item.expId}>
                      <td>{item.expId}</td>
                      <td>{item.expType}</td>
                      <td>{item.expCategory}</td>
                      <td>₹ {item.expValue}</td>
                      <td>{item.remarks}</td>

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
                  ))
                )}
              </tbody>
            </table>
          </div>
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
                placeholder="Search Expense Type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>EXPENSE TYPE</th>
                  <th>VALUE</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="no-data">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <React.Fragment key={item.expId}>
                      <tr className="summary-row">
                        <td>{formatDate(item.expDate)}</td>

                        <td>{item.expType}</td>

                        <td className="value-column">
                          <div
                            className="value-wrapper"
                            onMouseEnter={() => setHoveredItem(item.expId)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <span className="value-cell">
                              ₹ {item.expValue}
                            </span>

                            {hoveredItem === item.expId && (
                              <div className="expense-tooltip">
                                <p>
                                  <strong>Expense Type:</strong> {item.expType}
                                </p>

                                <p>
                                  <strong>Expense Category:</strong>{" "}
                                  {item.expCategory}
                                </p>

                                <p>
                                  <strong>Amount:</strong> ₹ {item.expValue}
                                </p>

                                <p>
                                  <strong>Remarks:</strong> {item.remarks}
                                </p>

                                <p>
                                  <strong>Created By:</strong> {item.createdBy}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Edit Expense</h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowEditModal(false);
                  setEditId(null);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Amount :</label>

                <input
                  type="number"
                  name="expValue"
                  value={formData.expValue}
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
                  setShowEditModal(false);
                  setEditId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={() => {
                  const updatedRecords = records.map((item) =>
                    item.expId === editId
                      ? {
                          ...item,
                          expValue: formData.expValue,
                          remarks: formData.remarks,
                        }
                      : item,
                  );

                  setRecords(updatedRecords);

                  setShowEditModal(false);
                  setEditId(null);
                }}
              >
                <FaSave />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Add Expense</h3>

              <FaTimes
                style={{ cursor: "pointer" }}
                onClick={() => setShowAddModal(false)}
              />
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Expense Category :</label>

                <select
                  value={newExpense.expCategory}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expCategory: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat.EC_ID} value={cat.EC_ID}>
                      {cat.Expense_Type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount :</label>

                <input
                  type="number"
                  value={newExpense.expValue}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expValue: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Date :</label>

                <input
                  type="date"
                  value={newExpense.expDate}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Remarks :</label>

                <textarea
                  value={newExpense.remarks}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      remarks: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>

              <button className="save-btn" onClick={handleAddExpense}>
                <FaSave />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseTransactions;
