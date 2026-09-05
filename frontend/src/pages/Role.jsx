import React, { useState, useEffect } from "react";
import "./Role.css";
import axios from "axios";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";
const API_URL = "http://localhost:5001/api/roles";

function Role() {
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("rid");
  const [searchTerm, setSearchTerm] = useState("");

  const [roles, setRoles] = useState([]);
  const [editData, setEditData] = useState(null);

  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/allRoles`);
      setRoles(response.data);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };

  const resetForm = () => {
    setRoleName("");
    setStatus("Active");
    setErrors({});
    setEditData(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (role) => {
    setEditData(role);
    setRoleName(role.Role_Name);
    setStatus(role.Active_Status ? "Active" : "Inactive");
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!roleName.trim()) {
      newErrors.roleName = "Role Name is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editData) {
        await axios.put(`${API_URL}/updateRole/${editData.RID}`, {
          Role_Name: roleName,
          Active_Status: status === "Active",
        });
      } else {
        await axios.post(`${API_URL}/createRole`, {
          Role_Name: roleName,
          Active_Status: status === "Active",
        });
      }

      await fetchRoles();

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.response?.data?.message || "Unable to save role");
    }
  };

  const handleDelete = async (rid) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await axios.delete(`${API_URL}/${rid}`);
      await fetchRoles();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const filteredRoles = roles
    .filter(
      (role) =>
        role.Role_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(role.RID).includes(searchTerm) ||
        (role.Active_Status ? "active" : "inactive").includes(
          searchTerm.toLowerCase(),
        ),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Role_Name.localeCompare(b.Role_Name);
      }
      if (sortOrder === "desc") {
        return b.Role_Name.localeCompare(a.Role_Name);
      }
      return 0;
    });

  return (
    <div className="role-page">
      <div className="role-header">
        <h2>Role Management</h2>
      </div>

      <div className="role-card">
        <div className="card-header">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add Role
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>RID</th>
              <th>
                <div className="sortable-header">
                  <span>ROLE</span>
                  <div className="sort-icons">
                    <span
                      className={`arrow-up ${
                        sortOrder === "asc" ? "active" : ""
                      }`}
                      onClick={() => setSortOrder("asc")}
                    ></span>
                    <span
                      className={`arrow-down ${
                        sortOrder === "desc" ? "active" : ""
                      }`}
                      onClick={() => setSortOrder("desc")}
                    ></span>
                  </div>
                </div>
              </th>
              <th>STATUS</th>
              <th>CREATED ON</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role.RID}>
                <td>{role.RID}</td>
                <td>{role.Role_Name}</td>
                <td>
                  <span
                    className={
                      role.Active_Status ? "status active" : "status inactive"
                    }
                  >
                    {role.Active_Status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  {role.Created_On
                    ? new Date(role.Created_On).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(role)}>
                    <FaEdit />
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleDelete(role.RID)}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editData ? "Edit Role" : "Add Role"}</h2>
              <FaTimes
                style={{ cursor: "pointer" }}
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              />
            </div>

            <form noValidate onSubmit={handleSubmit}>
              <div className="form-body">
                
                <div
                  className={`form-row ${errors.roleName ? "has-error" : ""}`}
                >
                  <label>ROLE NAME :</label>
                
                  <div className="input-container">
                    <input
                      type="text"
                      value={roleName}
                      placeholder="Enter role name"
                      onChange={(e) => {
                        setRoleName(e.target.value);
                        if (errors.roleName) {
                          setErrors({ ...errors, roleName: "" });
                        }
                      }}
                      className={errors.roleName ? "input-error" : ""}
                    />
                    {errors.roleName && (
                      <div className="tooltip-error-box">
                        <div className="tooltip-arrow"></div>
                        <span className="tooltip-icon">!</span>
                        <span className="tooltip-text">{errors.roleName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <label>STATUS :</label>
                 
                  <div className="input-container">
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        if (errors.status) {
                          setErrors({ ...errors, status: "" });
                        }
                      }}
                      className={errors.status ? "input-error" : ""}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && (
                      <div className="tooltip-error-box">
                        <div className="tooltip-arrow"></div>
                        <span className="tooltip-icon">!</span>
                        <span className="tooltip-text">{errors.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <FaSave /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Role;
