import React, { useState, useEffect } from "react";
import "./Role.css";
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
} from "../service/roleService";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";
function Role() {
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [roles, setRoles] = useState([]);
  const [editData, setEditData] = useState(null);

  const [roleName, setRoleName] = useState("");

  const [status, setStatus] = useState("Active");
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };
  const openAddModal = () => {
    setEditData(null);

    setRoleName("");

    setStatus("Active");

    setShowModal(true);
  };

  const handleEdit = (role) => {
    setEditData(role);

    setRoleName(role.Role_Name);

    setStatus(role.Active_Status ? "Active" : "Inactive");

    setShowModal(true);
  };

  const saveRole = async () => {
    if (!roleName.trim()) {
      alert("Role Name Required");
      return;
    }

    try {
      if (editData) {
        await updateRole(editData.RID, {
          Role_Name: roleName,
          Active_Status: status === "Active",
        });
      } else {
        await addRole({
          Role_Name: roleName,
          Active_Status: status === "Active",
        });
      }

      await fetchRoles();

      setRoleName("");
      setStatus("Active");
      setEditData(null);
      setShowModal(false);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };
  const handleDelete = async (rid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?",
    );

    if (!confirmDelete) return;

    try {
      await deleteRole(rid);

      await fetchRoles();

      alert("Role deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };
  const filteredRoles = roles.filter(
    (role) =>
      role.Role_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(role.RID).includes(searchTerm) ||
      (role.Active_Status ? "active" : "inactive").includes(
        searchTerm.toLowerCase(),
      ),
  );

  return (
    <div className="role-page">
      <div className="role-header">
        <h2>Role Management</h2>
      </div>

      <div className="role-card">
        <div className="card-header">
          <div className="search-box">
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
              <th>ROLE NAME</th>
              <th>STATUS</th>
              <th>CREATED ON</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredRoles.map((role, index) => (
              <tr key={index}>
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
                  {role.Created_on
                    ? new Date(role.Created_on).toLocaleDateString()
                    : ""}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(role)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(role.RID)}
                    >
                      <FaTrash />
                    </button>
                  </div>
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
                  setShowModal(false);
                  setEditData(null);
                }}
              />
            </div>
            <div className="form-row">
              <label>ROLE NAME :</label>
              <input
                type="text"
                value={roleName}
                placeholder="Enter role name"
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>STATUS :</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
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

              <button className="save-btn" onClick={saveRole}>
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Role;
