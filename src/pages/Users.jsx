import React, { useState } from "react";
import "./Users.css";
import { FaPlus, FaSearch, FaEdit, FaTimes, FaSave } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 2,
      empCode: "EMP001",
      name: "Srinithi",
      email: "srinithi@gmail.com",
      mobile: "9876543210",
      role: "Admin",
      status: "Active",
      password: "123456",
    },
    {
      id: 3,
      empCode: "EMP002",
      name: "Priya Sharma",
      email: "priya@corp.in",
      mobile: "9876543211",
      role: "User",
      status: "Active",
      password: "123456",
    },
    {
      id: 4,
      empCode: "EMP003",
      name: "Rahul Verma",
      email: "rahul@corp.in",
      mobile: "9876543212",
      role: "User",
      status: "Inactive",
      password: "123456",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);

  const getNextEmpCode = () => {
    return `EMP${String(users.length + 1).padStart(3, "0")}`;
  };

  const [formData, setFormData] = useState({
    empCode: "",
    name: "",
    email: "",
    mobile: "",
    role: "User",
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
      role: "User",
      status: "Active",
      password: "",
    });

    setEditUser(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editUser) {
      setUsers(
        users.map((user) =>
          user.id === editUser.id ? { ...user, ...formData } : user,
        ),
      );
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
      };

      setUsers([...users, newUser]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (user) => {
    setEditUser(user);

    setFormData({
      empCode: user.empCode,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      password: user.password,
    });

    setShowModal(true);
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.empCode.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.mobile.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value) ||
      user.status.toLowerCase().includes(value)
    );
  });

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>User Management</h2>
      </div>

      <div className="users-card">
        <div className="table-top">
          <div className="search-box">
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.empCode}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>

                <td>
                  <span
                    className={
                      user.role === "Admin" ? "role admin" : "role user"
                    }
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    <FaEdit />
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
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>ROLE :</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>Admin</option>
                    <option>User</option>
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
                    onChange={handleChange}
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
