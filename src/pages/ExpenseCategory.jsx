import React, { useState } from "react";
import "./ExpenseCategory.css";
import { FaPlus, FaEdit, FaTimes, FaSave } from "react-icons/fa";

function ExpenseCategory() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      ecId: 1,
      name: "Food",
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 2,
      ecId: 2,
      name: "Travel",
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 3,
      ecId: 3,
      name: "Shopping",
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 4,
      ecId: 4,
      name: "Medical",
      status: "Active",
      createdBy: "Admin",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const getNextId = () => {
    return categories.length + 1;
  };

  const [formData, setFormData] = useState({
    ecId: getNextId(),
    name: "",
    status: "Active",
    createdBy: "Admin",
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
      createdBy: "Admin",
    });

    setEditCategory(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editCategory.id ? { ...cat, ...formData } : cat,
        ),
      );
    } else {
      const newCategory = {
        id: categories.length + 1,
        ...formData,
      };

      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setFormData(cat);
    setShowModal(true);
  };

  const filteredCategories = categories.filter((cat) => {
    const val = search.toLowerCase();

    return (
      cat.ecId.toString().includes(val) ||
      cat.name.toLowerCase().includes(val) ||
      cat.status.toLowerCase().includes(val) ||
      cat.createdBy.toLowerCase().includes(val)
    );
  });

  return (
    <div className="category-page">
      <div className="category-header">
        <h2>Expense Category Management</h2>
      </div>

      <div className="category-card">
        <div className="table-top">
          <div className="search-box">
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
                <th>EXPENSE TYPE</th>
                <th>STATUS</th>
                <th>CREATED BY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.ecId}</td>

                  <td>{cat.name}</td>

                  <td>
                    <span
                      className={
                        cat.status === "Active"
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {cat.status}
                    </span>
                  </td>

                  <td>{cat.createdBy}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(cat)}
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

                <div className="form-row">
                  <label>CREATED BY :</label>
                  <input
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    required
                  />
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
