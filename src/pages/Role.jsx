import React, { useState } from "react";
import "./Role.css";

import {
  FaPlus,
  FaEdit,
  FaTimes,
  FaSave
} from "react-icons/fa";

function Role() {

  const [showModal, setShowModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [roles, setRoles] = useState([
    {
      rid: "RO01",
      roleName: "Admin",
      status: "Active",
      createdOn: "01 Jan 2025"
    },
    {
      rid: "RO02",
      roleName: "User",
      status: "Active",
      createdOn: "01 Jan 2025"
    },
    {
      rid: "RO03",
      roleName: "Manager",
      status: "Inactive",
      createdOn: "15 Mar 2025"
    }
  ]);

  const [roleName, setRoleName] =
    useState("");

  const [status, setStatus] =
    useState("Active");

  const saveRole = () => {

    if (!roleName.trim()) {
      alert("Role Name Required");
      return;
    }

    const newRole = {
      rid: `RO0${roles.length + 1}`,
      roleName,
      status,
      createdOn: "28 May 2026"
    };

    setRoles([...roles, newRole]);

    setRoleName("");
    setStatus("Active");
    setShowModal(false);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.roleName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      role.rid
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      role.status
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="role-page">

      <div className="role-card">

        <div className="card-header">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
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

            {filteredRoles.map(
              (role, index) => (

              <tr key={index}>

                <td>{role.rid}</td>

                <td>{role.roleName}</td>

                <td>
                  <span
                    className={
                      role.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {role.status}
                  </span>
                </td>

                <td>{role.createdOn}</td>

                <td>
                  <button className="edit-btn">
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

              <h2>Add Role</h2>

              <FaTimes
                style={{cursor:"pointer"}}
                onClick={() =>
                  setShowModal(false)
                }
              />

            </div>

            <div className="modal-body">

              <label>ROLE NAME</label>

              <input
                type="text"
                value={roleName}
                placeholder="Enter role name"
                onChange={(e) =>
                  setRoleName(e.target.value)
                }
              />

              <label>STATUS</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={saveRole}
                >
                  <FaSave /> Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Role;