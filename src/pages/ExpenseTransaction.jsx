import React, { useState, useEffect } from "react";
import "./ExpenseTransaction.css";
import {
  FaSave,
  FaEdit,
  FaSearch,
  FaUpload,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
function ExpenseTransactions() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/expense-categories",
      );

      console.log("Expense Categories:", response.data);

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const [expenseTypes, setExpenseTypes] = useState([]);
  const [newExpense, setNewExpense] = useState({
    userId: "",
    userName: "",
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
  const fetchExpenseTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/expense-types",
      );

      console.log("Expense Types API:", response.data);

      setExpenseTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchCategories();
    fetchExpenseTypes();
    fetchExpenses();
  }, []);
  const [records, setRecords] = useState([]);
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/expense-transactions",
      );

      console.log("Expense Data:", response.data);

      const formatted = response.data.map((item) => ({
        expId: item.EXP_ID,
        userId: item.UID,
        userName: item.Emp_Name,
        expType: item.Expense_Type,
        expCategory: item.Expense_Name,
        expValue: item.Amount,
        expDate: item.Expense_Date,
        remarks: item.Remarks,
      }));

      setRecords(formatted);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newExpense);

  const handleAddExpense = async () => {
    if (
      !newExpense.userId ||
      !newExpense.expDate ||
      !newExpense.expType ||
      !newExpense.expCategory ||
      !newExpense.expValue
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (Number(newExpense.expValue) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const duplicate = records.find(
      (item) =>
        String(item.userId) === String(newExpense.userId) &&
        String(item.expDate).substring(0, 10) === newExpense.expDate &&
        item.expType ===
          categories.find((c) => String(c.EC_ID) === String(newExpense.expType))
            ?.Expense_Type &&
        item.expCategory ===
          expenseTypes.find(
            (e) => String(e.ET_ID) === String(newExpense.expCategory),
          )?.Expense_Name,
    );

    if (duplicate) {
      alert("Duplicate Expense Entry Already Exists");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/expense-transactions", {
        userId: newExpense.userId,
        expType: newExpense.expType,
        expCategory: newExpense.expCategory,
        expValue: newExpense.expValue,
        expDate: newExpense.expDate,
        remarks: newExpense.remarks,
      });

      alert("Expense Saved Successfully");

      fetchExpenses();

      setNewExpense({
        userId: "",
        expType: "",
        expCategory: "",
        expValue: "",
        expDate: "",
        remarks: "",
      });

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }

    console.log(newExpense);
    setNewExpense({
      userId: "",
      userName: "",
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

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

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
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/expense-transactions/${id}`,
      );

      alert("Expense Deleted Successfully");

      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
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

    return item.expDate?.substring(0, 7) === selectedMonth;
  });

  const filteredRecords = records.filter((item) =>
    String(item.userId).toLowerCase().includes(search.toLowerCase()),
  );
  console.log("Selected Type:", newExpense.expType);

  console.log(
    "Matching Expense Names:",
    expenseTypes.filter(
      (item) => Number(item.EC_ID) === Number(newExpense.expType),
    ),
  );
  const resetNewExpense = () => {
    setNewExpense({
      userId: "",
      userName: "",
      expType: "",
      expCategory: "",
      expValue: "",
      expDate: "",
      remarks: "",
    });
  };
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

            <button
              className="add-btn"
              onClick={() => {
                resetNewExpense();
                setShowAddModal(true);
              }}
            >
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
                  <th>USER ID</th>
                  <th>USER NAME</th>
                  <th>DATE</th>
                  <th>EXPENSE TYPE</th>
                  <th>EXPENSE NAME</th>
                  <th>AMOUNT</th>
                  <th>REMARKS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {monthlyRecords.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  monthlyRecords.map((item) => (
                    <tr key={item.expId}>
                      <td>{item.expId}</td>
                      <td>{item.userId}</td>
                      <td>{item.userName}</td>
                      <td>{formatDate(item.expDate)}</td>
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

                        <button
                          type="button"
                          className="edit-btn"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleDelete(item.expId)}
                        >
                          <FaTrash style={{ color: "#ef4444" }} />
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
                placeholder="Search User ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>EXPENSE ID</th>
                  <th>USER ID</th>
                  <th>USER NAME</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <React.Fragment key={item.expId}>
                      <tr className="summary-row">
                        <td>{item.expId}</td>

                        <td>{item.userId}</td>

                        <td>{item.userName}</td>

                        <td>{formatDate(item.expDate)}</td>

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
                  handleReset();
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
                onClick={() => {
                  resetNewExpense();
                  setShowAddModal(false);
                }}
              />
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>User :</label>

                <select
                  required
                  value={newExpense.userId}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      userId: e.target.value,
                    })
                  }
                >
                  <option value="">Select User</option>

                  {users.map((user) => (
                    <option key={user.UID} value={user.UID}>
                      {user.Emp_Code} - {user.Emp_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date :</label>

                <input
                  required
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
                <label>Expense Type :</label>

                <select
                  required
                  value={newExpense.expType}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expType: e.target.value,
                      expCategory: "",
                    })
                  }
                >
                  <option value="">Select Type</option>

                  {categories.map((cat) => (
                    <option key={cat.EC_ID} value={cat.EC_ID}>
                      {cat.Expense_Type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Expense Name :</label>

                <select
                  required
                  disabled={!newExpense.expType}
                  value={newExpense.expCategory}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expCategory: e.target.value,
                    })
                  }
                >
                  <option value="">Select Expense Name</option>

                  {expenseTypes
                    .filter(
                      (item) =>
                        Number(item.EC_ID) === Number(newExpense.expType),
                    )
                    .map((item) => (
                      <option key={item.ET_ID} value={item.ET_ID}>
                        {item.Expense_Name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount :</label>

                <input
                  required
                  type="number"
                  min="1"
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
                <label>Remarks :</label>

                <textarea
                  maxLength={250}
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
                onClick={() => {
                  resetNewExpense();
                  setShowAddModal(false);
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleAddExpense}
                disabled={
                  !newExpense.userId ||
                  !newExpense.expDate ||
                  !newExpense.expType ||
                  !newExpense.expCategory ||
                  !newExpense.expValue ||
                  !newExpense.remarks
                }
              >
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
