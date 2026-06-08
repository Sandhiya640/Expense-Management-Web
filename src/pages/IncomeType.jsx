import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IncomeType.css";
import { FaSearch,FaPlus, FaEdit, FaTimes, FaSave, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5001/api/income-types";
function IncomeType() {
  const [incomeTypes, setIncomeTypes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editIncomeType, setEditIncomeType] = useState(null);

const [formData, setFormData] = useState({
  incomeType: "",
  activeStatus: "Active",
});

  const fetchIncomeTypes = async () => {
    try {
      const response = await axios.get(API_URL);
      setIncomeTypes(response.data);
    } catch (error) {
      console.log("Error fetching income types:", error);
    }
  };

  useEffect(() => {
    fetchIncomeTypes();
  }, []);

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 };

 const resetForm = () => {
   setFormData({
     incomeType: "",
     activeStatus: "Active",
   });

   setEditIncomeType(null);
 };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        Income_Type: formData.incomeType,
        Active_Status: formData.activeStatus === "Active" ? 1 : 0,
      };

      if (editIncomeType) {
        await axios.put(`${API_URL}/${editIncomeType.IT_ID}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      await fetchIncomeTypes();

      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

const handleEdit = (item) => {
  setEditIncomeType(item);

  setFormData({
    incomeType: item.Income_Type,
    activeStatus: Number(item.Active_Status) === 1 ? "Active" : "Inactive",
  });

  setShowModal(true);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this income type?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);

    fetchIncomeTypes();
  } catch (error) {
    console.log(error);
  }
};

const filteredIncomeTypes = incomeTypes.filter((item) => {
  const value = search.toLowerCase();

  return (
    item.IT_ID?.toString().includes(value) ||
    item.Income_Type?.toLowerCase().includes(value)
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
            <FaSearch/>
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
              <tr key={item.IT_ID}>
                <td>{item.IT_ID}</td>

                <td>{item.Income_Type}</td>

                <td>
                  <span
                    className={
                      Number(item.Active_Status) === 1
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {Number(item.Active_Status) === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{item.Created_By}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleDelete(item.IT_ID)}
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
              <h2>{editIncomeType ? "Edit Income Type" : "Add Income Type"}</h2>

              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-layout">
                <div className="form-row">
                  <label>INCOME TYPE :</label>

                  <input
                    type="text"
                    name="incomeType"
                    placeholder="Enter income type"
                    value={formData.incomeType}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>STATUS :</label>

                  <select
                    name="activeStatus"
                    value={formData.activeStatus}
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
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
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

export default IncomeType;
