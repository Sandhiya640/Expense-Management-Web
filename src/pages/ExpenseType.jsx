import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseType.css";

import {
  getExpenseTypes,
  addExpenseType,
  updateExpenseType,
  deleteExpenseType,
} from "../service/expenseTypeService";

import { FaSearch,FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";

function ExpenseType() {
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [expenseTypes, setExpenseTypes] = useState([]);

  const [editData, setEditData] = useState(null);

  const [editExpenseName, setEditExpenseName] = useState("");

  const [editCategoryId, setEditCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [editStatus, setEditStatus] = useState("Active");
useEffect(() => {
  fetchExpenseTypes();
  fetchCategories();
}, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/expense-categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const fetchExpenseTypes = async () => {
    try {
      const response = await getExpenseTypes();

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

    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditData(item);

    setEditCategoryId(item.EC_ID);

    setEditExpenseName(item.Expense_Name);

    setEditStatus(item.Active_Status ? "Active" : "Inactive");

    setShowModal(true);
  };

  const saveExpenseType = async () => {
    if (!editExpenseName.trim() || !editCategoryId) {
      alert("All fields are required");
      return;
    }

    const payload = {
      EC_ID: parseInt(editCategoryId),
      Expense_Name: editExpenseName,
      Active_Status: editStatus === "Active",
    };

    try {
      if (editData) {
        await updateExpenseType(editData.ET_ID, payload);
      } else {
        await addExpenseType(payload);
      }

      await fetchExpenseTypes();

      setShowModal(false);

      setEditData(null);

      setEditExpenseName("");

      setEditCategoryId("");

      setEditStatus("Active");
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
      await deleteExpenseType(id);

      await fetchExpenseTypes();

      alert("Expense Type deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const filteredExpenseTypes = expenseTypes.filter(
    (item) =>
      item.Expense_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.ET_ID).includes(searchTerm) ||
      String(item.EC_ID).includes(searchTerm),
  );

  return (
    <div className="expense-page">
      <div className="expense-header">
        <h2>Expense Type Management</h2>
      </div>

      <div className="expense-card">
        <div className="card-header">
          <div className="search-box">
            <FaSearch/>
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
              <th>EXPENSE NAME</th>
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
                    style={{
                      marginLeft: "10px",
                    }}
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
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
              />
            </div>
            <div className="form-layout">
              <div className="form-row">
                <label>EXPENSE CATEGORY :</label>

                <select
                  value={editCategoryId}
                  onChange={(e) => setEditCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat.EC_ID} value={cat.EC_ID}>
                      {cat.Expense_Type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label>EXPENSE NAME :</label>

                <input
                  type="text"
                  value={editExpenseName}
                  onChange={(e) => setEditExpenseName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>STATUS :</label>

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option>Active</option>

                  <option>Inactive</option>
                </select>
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

export default ExpenseType;
