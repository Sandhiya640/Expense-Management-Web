import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseType.css";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const API_URL = "http://localhost:5001/api/expense-types";

function ExpenseType() {
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("etid");
  const [searchTerm, setSearchTerm] = useState("");

  const [expenseTypes, setExpenseTypes] = useState([]);
  const [editData, setEditData] = useState(null);

  const [editExpenseName, setEditExpenseName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [editStatus, setEditStatus] = useState("Active");

  // 🔹 Added state tracker for fields validation
  const [errors, setErrors] = useState({});

  const toggleSort = () => {
    if (sortOrder === "etid") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("etid");
    }
  };

  useEffect(() => {
    fetchExpenseTypes();
    fetchCategories();
  }, []);

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/expense-categories/allCategories",
    );

    setCategories(response.data);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const fetchExpenseTypes = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/allExpenseTypes`
    );

    setExpenseTypes(response.data);
  } catch (error) {
    console.error("Error loading expense types:", error);
  }
};

  const openAddModal = () => {
    setEditData(null);
    setEditExpenseName("");
    setEditCategoryId("");
    setEditStatus("Active");
    setErrors({}); // 🔹 Clear on open
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setEditCategoryId(item.EC_ID);
    setEditExpenseName(item.Expense_Name);
    setEditStatus(item.Active_Status ? "Active" : "Inactive");
    setErrors({}); // 🔹 Clear on edit
    setShowModal(true);
  };

  const saveExpenseType = async () => {
    // 🔹 Verification validation logic matching Roles interface
    const newErrors = {};

    if (!editCategoryId) {
      newErrors.categoryId = "Expense Category is required";
    }
    if (!editExpenseName.trim()) {
      newErrors.expenseName = "Expense Name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      EC_ID: parseInt(editCategoryId),
      Expense_Name: editExpenseName,
      Active_Status: editStatus === "Active",
    };

    try {
     if (editData) {
       await axios.put(
         `${API_URL}/updateExpenseType/${editData.ET_ID}`,
         payload,
       );
     } else {
       await axios.post(`${API_URL}/createExpenseType`, payload);
     }

      await fetchExpenseTypes();
      setShowModal(false);
      setEditData(null);
      setEditExpenseName("");
      setEditCategoryId("");
      setEditStatus("Active");
      setErrors({});
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Expense Type?",
    );
    if (!confirmDelete) return;

    try {
     await axios.delete(`${API_URL}/${id}`);
      await fetchExpenseTypes();
      alert("Expense Type deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const filteredExpenseTypes = expenseTypes
    .filter(
      (item) =>
        item.Expense_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.ET_ID).includes(searchTerm) ||
        String(item.EC_ID).includes(searchTerm),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Expense_Name.localeCompare(b.Expense_Name);
      }
      if (sortOrder === "desc") {
      return b.Expense_Name.localeCompare(a.Expense_Name);
      }
      return 0;
    });

  return (
    <div className="expense-page">
      <div className="expense-header">
        <h2>Expense Type Management</h2>
      </div>

      <div className="expense-card">
        <div className="card-header">
          <div className="search-box">
            <FaSearch />
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

        <table>
          <thead>
            <tr>
              <th>ET ID</th>
              <th>EC ID</th>
              <th>
                <div className="sortable-header">
                  <span>EXPENSE TYPE</span>
                  <div className="sort-icons">
                    <span
                      className={`arrow-up ${sortOrder === "asc" ? "active" : ""}`}
                      onClick={() => setSortOrder("asc")}
                    ></span>
                    <span
                      className={`arrow-down ${sortOrder === "desc" ? "active" : ""}`}
                      onClick={() => setSortOrder("desc")}
                    ></span>
                  </div>
                </div>
              </th>
              <th>STATUS</th>
              <th>CREATED BY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenseTypes.map((item) => (
              <tr key={item.ET_ID}>
                <td>{item.ET_ID}</td>
                <td>{item.EC_ID}</td>
                <td>{item.Expense_Name}</td>
                <td>
                  <span
                    className={
                      item.Active_Status ? "status active" : "status inactive"
                    }
                  >
                    {item.Active_Status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{item.Created_By}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </button>

                  <button
                    className="edit-btn delete-icon-btn"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(item.ET_ID)}
                  >
                    <FaTrash style={{ color: "#ef4444" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editData ? "Edit Expense Type" : "Add Expense Type"}</h2>
              <FaTimes
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
              />
            </div>

            <div className="form-layout">
              {/* EXPENSE CATEGORY ROW */}
              <div className="form-row">
                <label>EXPENSE CATEGORY :</label>
                <div className="input-container">
                  <select
                    value={editCategoryId}
                    onChange={(e) => {
                      setEditCategoryId(e.target.value);
                      if (errors.categoryId) {
                        setErrors({ ...errors, categoryId: "" });
                      }
                    }}
                    className={errors.categoryId ? "input-error" : ""}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.EC_ID} value={cat.EC_ID}>
                        {cat.Expense_Type}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <div className="tooltip-error-box">
                      <div className="tooltip-arrow"></div>
                      <span className="tooltip-icon">!</span>
                      <span className="tooltip-text">{errors.categoryId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* EXPENSE NAME ROW */}
              <div className="form-row">
                <label>EXPENSE NAME :</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={editExpenseName}
                    onChange={(e) => {
                      setEditExpenseName(e.target.value);
                      if (errors.expenseName) {
                        setErrors({ ...errors, expenseName: "" });
                      }
                    }}
                    className={errors.expenseName ? "input-error" : ""}
                  />
                  {errors.expenseName && (
                    <div className="tooltip-error-box">
                      <div className="tooltip-arrow"></div>
                      <span className="tooltip-icon">!</span>
                      <span className="tooltip-text">{errors.expenseName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* STATUS ROW */}
              <div className="form-row">
                <label>STATUS :</label>
                <div className="input-container">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={saveExpenseType}>
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseType;
