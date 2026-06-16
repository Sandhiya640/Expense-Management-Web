import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTimes,
  FaSave,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

const API_URL = "http://localhost:5001/api/users";

function Users() {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] = useState("empcode");

const toggleSort = () => {
  if (sortOrder === "empcode") {
    setSortOrder("asc");
  } else if (sortOrder === "asc") {
    setSortOrder("desc");
  } else {
    setSortOrder("empcode");
  }
};
  const [editUser, setEditUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);

      console.log("API Response:", response.data);

      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/roles");

      setRoles(response.data);
    } catch (error) {
      console.log("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);
const handleNameSort = (order) => {
  setSortOrder(order);
};
  const getNextEmpCode = () => {
    const maxCode =
      users.length > 0
        ? Math.max(
            ...users.map((u) => parseInt(u.Emp_Code?.replace("EMP", "") || 0)),
          )
        : 0;

    return `EMP${String(maxCode + 1).padStart(3, "0")}`;
  };

  const [formData, setFormData] = useState({
    empCode: "",
    name: "",
    email: "",
    mobile: "",
    role: "",
    status: "Active",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      empCode: getNextEmpCode(),
      name: "",
      email: "",
      mobile: "",
      role: "",
      status: "Active",
      password: "",
    });

    setEditUser(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must contain exactly 10 digits");
      return;
    }

   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
     alert("Invalid email format");
     return;
   }

    const passwordExists = users.some(
      (u) =>
        u.Password === formData.password &&
        (!editUser || u.UID !== editUser.UID),
    );

    if (passwordExists) {
      alert("Password already used by another user");
      return;
    }

    try {
      const payload = {
        RID: Number(formData.role),
        Emp_Code: formData.empCode,
        Emp_Name: formData.name,
        Mail_ID: formData.email,
        Mobile_No: formData.mobile,
        Password: formData.password,
        Active_Status: formData.status === "Active" ? 1 : 0,
      };
      if (editUser) {
        await axios.put(`${API_URL}/${editUser.UID}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      await fetchUsers();

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Operation Failed");
    }
  };;

  const handleEdit = (user) => {
    setEditUser(user);

    setFormData({
      empCode: user.Emp_Code,
      name: user.Emp_Name,
      email: user.Mail_ID,
      mobile: user.Mobile_No,
      role: user.RID.toString(),
      status: Number(user.Active_Status) === 1 ? "Active" : "Inactive",
      password: "",
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

const filteredUsers = users
  .filter((user) => {
    const value = search.toLowerCase();

    return (
      user.Emp_Name?.toLowerCase().includes(value) ||
      user.Emp_Code?.toLowerCase().includes(value) ||
      user.Mail_ID?.toLowerCase().includes(value) ||
      user.Mobile_No?.includes(value)
    );
  })
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.Emp_Name.localeCompare(b.Emp_Name);
    }

    if (sortOrder === "desc") {
      return b.Emp_Name.localeCompare(a.Emp_Name);
    }

    // Default EMP CODE sorting
    const empA = parseInt(a.Emp_Code?.replace("EMP", "") || 0);
    const empB = parseInt(b.Emp_Code?.replace("EMP", "") || 0);

    return empA - empB;
  });
  return (
    <div className="users-page">
      <div className="users-header">
        <h2>User Management</h2>
      </div>

      <div className="users-card">
        <div className="table-top">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add User
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>EMP CODE</th>
              <th>
                <div className="sortable-header" onClick={toggleSort}>
                  NAME
                  <FaSort className="sort-icon" />
                </div>
              </th>
              <th>EMAIL</th>
              <th>MOBILE</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.UID}>
                <td>{user.Emp_Code}</td>
                <td>{user.Emp_Name}</td>
                <td>{user.Mail_ID}</td>
                <td>{user.Mobile_No}</td>

                <td>
                  <span className="role user">
                    {roles.find((role) => role.RID === user.RID)?.Role_Name ||
                      "No Role"}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      Number(user.Active_Status) === 1
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {Number(user.Active_Status) === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleDelete(user.UID)}
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
              <h2>{editUser ? "Edit User" : "Add User"}</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="form-row">
                  <label>EMP CODE :</label>
                  <input
                    type="text"
                    name="empCode"
                    value={formData.empCode}
                    readOnly
                  />
                </div>

                <div className="form-row">
                  <label>ROLE :</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>

                    {roles.map((role) => (
                      <option key={role.RID} value={role.RID}>
                        {role.Role_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label>FULL NAME :</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>MOBILE :</label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({
                        ...formData,
                        mobile: value,
                      });
                    }}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>EMAIL :</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>PASSWORD :</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
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

export default Users;
