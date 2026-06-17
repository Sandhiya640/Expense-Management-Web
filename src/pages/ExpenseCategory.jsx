import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseCategory.css";
import {
  FaPlus,
  FaEdit,
  FaTimes,
  FaSave,
  FaTrash,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

const API_URL = "http://localhost:5001/api/expense-categories";

function ExpenseCategory() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("ecid");
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);

      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getNextId = () => {
    return categories.length > 0
      ? Math.max(...categories.map((c) => c.EC_ID)) + 1
      : 1;
  };
const toggleSort = () => {
  if (sortOrder === "ecid") {
    setSortOrder("asc");
  } else if (sortOrder === "asc") {
    setSortOrder("desc");
  } else {
    setSortOrder("ecid");
  }
};
 const [formData, setFormData] = useState({
   ecId: "",
   name: "",
   status: "Active",
 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      ecId: getNextId(),
      name: "",
      status: "Active",
    });

    setEditCategory(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const payload = {
       Expense_Type: formData.name,
       Active_Status: formData.status === "Active" ? 1 : 0,
     };

     if (editCategory) {
       await axios.put(`${API_URL}/${editCategory.EC_ID}`, payload);
     } else {
       await axios.post(API_URL, payload);
     }

     await fetchCategories();

     setShowModal(false);
     resetForm();
   } catch (error) {
     alert(error.response?.data?.message || "Operation Failed");
   }
 };

 const handleEdit = (cat) => {
   setEditCategory(cat);

   setFormData({
     ecId: cat.EC_ID,
     name: cat.Expense_Type,
     status: Number(cat.Active_Status) === 1 ? "Active" : "Inactive",
   });

   setShowModal(true);
 };

 const handleDelete = async (id) => {
   if (!window.confirm("Delete this category?")) return;

   try {
     await axios.delete(`${API_URL}/${id}`);

     fetchCategories();
   } catch (error) {
     console.log(error);
     alert("Delete Failed");
   }
 };

 const filteredCategories = categories
   .filter((cat) => {
     const val = search.toLowerCase();

     return (
       cat.EC_ID?.toString().includes(val) ||
       cat.Expense_Type?.toLowerCase().includes(val)
     );
   })
   .sort((a, b) => {
     if (sortOrder === "asc") {
       return a.Expense_Type.localeCompare(b.Expense_Type);
     }

     if (sortOrder === "desc") {
       return b.Expense_Type.localeCompare(a.Expense_Type);
     }

     return 0;
   });

  return (
    <div className="category-page">
      <div className="category-header">
        <h2>Expense Category Management</h2>
      </div>

      <div className="category-card">
        <div className="table-top">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add Category
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>EC ID</th>
                <th>
                  <div className="sortable-header">
                    <span>EXPENSE CATEGORY</span>

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
              {filteredCategories.map((cat) => (
                <tr key={cat.EC_ID}>
                  <td>{cat.EC_ID}</td>

                  <td>{cat.Expense_Type}</td>

                  <td>
                    <span
                      className={
                        Number(cat.Active_Status) === 1
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {Number(cat.Active_Status) === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>{cat.Created_By}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(cat)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => handleDelete(cat.EC_ID)}
                      style={{ marginLeft: "10px" }}
                    >
                      <FaTrash style={{ color: "#ef4444" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editCategory ? "Edit Category" : "Add Category"}</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="form-row">
                  <label>EC ID :</label>
                  <input name="ecId" value={formData.ecId} readOnly />
                </div>

                <div className="form-row">
                  <label>EXPENSE TYPE :</label>
                  <input
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>STATUS :</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  <FaSave />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseCategory;
