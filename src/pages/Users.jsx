import React, { useState } from "react";
import "./Users.css";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTimes,
  FaSave,
} from "react-icons/fa";

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      empCode: "EMP001",
      name: "John Admin",
      email: "john@corp.in",
      mobile: "9876543210",
      role: "Admin",
      status: "Active",
      password: "123456",
    },
    {
      id: 2,
      empCode: "EMP002",
      name: "Priya Sharma",
      email: "priya@corp.in",
      mobile: "9876543211",
      role: "User",
      status: "Active",
      password: "123456",
    },
    {
      id: 3,
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
          user.id === editUser.id
            ? { ...user, ...formData }
            : user
        )
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.empCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">

      <div className="users-header">
        <h2>User Management</h2>
      </div>

      <div className="users-card">

        <div className="table-top">

          <div className="search-box">
            <FaSearch className="search-icon" />

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
                      user.role === "Admin"
                        ? "role admin"
                        : "role user"
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
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                  >
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

              <h2>
                {editUser ? "Edit User" : "Add User"}
              </h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group">
                  <label>EMP CODE</label>

                  <input
                    type="text"
                    name="empCode"
                    value={formData.empCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">

                  <label>ROLE</label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>Admin</option>
                    <option>User</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>FULL NAME</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>MOBILE</label>

                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group full-width">

                  <label>EMAIL</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>PASSWORD</label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>STATUS</label>

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
                  type="submit"
                  className="save-btn"
                >
                  <FaSave />
                  Save
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
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