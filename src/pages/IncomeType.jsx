import React, { useState } from "react";
import "./IncomeType.css";
import { FaPlus, FaEdit, FaTimes, FaSave } from "react-icons/fa";

function IncomeType() {
  const [incomeTypes, setIncomeTypes] = useState([
    {
      itId: 1,
      incomeType: "Salary",
      activeStatus: 1,
      createdOn: "2026-05-25 17:18:52",
      createdBy: "Admin",
      modifiedBy: null,
      modifiedOn: null,
    },
    {
      itId: 2,
      incomeType: "Freelancing",
      activeStatus: 1,
      createdOn: "2026-05-25 17:18:52",
      createdBy: "Admin",
      modifiedBy: null,
      modifiedOn: null,
    },
    {
      itId: 3,
      incomeType: "Business",
      activeStatus: 1,
      createdOn: "2026-05-25 17:18:52",
      createdBy: "Admin",
      modifiedBy: null,
      modifiedOn: null,
    },
    {
      itId: 4,
      incomeType: "Rental Income",
      activeStatus: 1,
      createdOn: "2026-05-25 17:18:52",
      createdBy: "Admin",
      modifiedBy: null,
      modifiedOn: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editIncomeType, setEditIncomeType] = useState(null);

  const [formData, setFormData] = useState({
    incomeType: "",
    activeStatus: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "activeStatus"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      incomeType: "",
      activeStatus: 1,
    });

    setEditIncomeType(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIncomeType) {
      setIncomeTypes(
        incomeTypes.map((item) =>
          item.itId === editIncomeType.itId
            ? {
                ...item,
                incomeType: formData.incomeType,
                activeStatus: formData.activeStatus,
                modifiedBy: "Admin",
                modifiedOn: new Date().toLocaleString(),
              }
            : item,
        ),
      );
    } else {
      const newIncomeType = {
        itId:
          incomeTypes.length > 0
            ? Math.max(...incomeTypes.map((item) => item.itId)) + 1
            : 1,

        incomeType: formData.incomeType,
        activeStatus: formData.activeStatus,
        createdOn: new Date().toLocaleString(),
        createdBy: "Admin",
        modifiedBy: null,
        modifiedOn: null,
      };

      setIncomeTypes([...incomeTypes, newIncomeType]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (item) => {
    setEditIncomeType(item);

    setFormData({
      incomeType: item.incomeType,
      activeStatus: item.activeStatus,
    });

    setShowModal(true);
  };

  const filteredIncomeTypes = incomeTypes.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.incomeType.toLowerCase().includes(value) ||
      item.createdBy.toLowerCase().includes(value)
    );
  });

  return (
    <div className="income-page">
      <div className="income-header">
        <h2>IncomeType Management</h2>
      </div>

      <div className="income-card">
        <div className="table-top">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search income types..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <FaPlus />
            Add Type
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>IT ID</th>
              <th>INCOME TYPE</th>
              <th>STATUS</th>
              <th>CREATED BY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredIncomeTypes.map((item) => (
              <tr key={item.itId}>
                <td>{item.itId}</td>

                <td>{item.incomeType}</td>

                <td>
                  <span
                    className={
                      item.activeStatus === 1
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {item.activeStatus === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{item.createdBy}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
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
              <h2>{editIncomeType ? "Edit Income Type" : "Add Income Type"}</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>INCOME TYPE</label>

                  <input
                    type="text"
                    name="incomeType"
                    placeholder="Enter income type"
                    value={formData.incomeType}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>STATUS</label>

                  <select
                    name="activeStatus"
                    value={formData.activeStatus}
                    onChange={handleChange}
                  >
                    <option value={1}>Active</option>

                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
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

export default IncomeType;
