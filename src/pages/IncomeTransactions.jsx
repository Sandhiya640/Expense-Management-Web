import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx-js-style";
import "./IncomeTransactions.css";
import {
  FaSave,
  FaEdit,
  FaSearch,
  FaUpload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const API_URL = "http://localhost:5001/api/income-trn";

function IncomeTransactions() {
  const [activeTab, setActiveTab] = useState("single");

  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [incomeTypes, setIncomeTypes] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    incomeType: "",
    amount: "",
    incomeDate: "",
    remarks: "",
  });

  const fetchIncomeRecords = async () => {
    try {
      const res = await axios.get(API_URL);

      console.log("Response Data:", res.data);

      const data = res.data.map((item) => ({
        id: item.INC_ID,
        userId: item.Emp_Code,
        username: item.Emp_Name,
        uid: item.UID,
        incomeType: item.IT_ID,
        incomeTypeName: item.Income_Type,
        amount: item.Inc_Value,
        incomeDate: new Date(item.Inc_Date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
        remarks: item.Remarks,
      }));

      console.log("Mapped Data:", data);

      setRecords(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchIncomeTypes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/income-trn/income-types",
      );

      setIncomeTypes(res.data);
    } catch (error) {
      console.error("Income Type Error:", error);
    }
  };

  useEffect(() => {
    fetchIncomeRecords();
    fetchIncomeTypes();
  }, []);

  useEffect(() => {
    if (activeTab === "records") {
      setSearch("");
    }
  }, [activeTab]);

  useEffect(() => {
    setSearch(""); 
  }, [activeTab]);

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const reverseDate = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUserDetails = async (empCode) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/income-trn/user/${empCode}`,
      );

      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          userId: res.data.Emp_Code,
          username: res.data.Emp_Name,
          uid: res.data.UID,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Income deleted successfully");

      fetchIncomeRecords();
    } catch (error) {
      console.error(error);
      alert("Error deleting income");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);

        const res = await axios.post(
          "http://localhost:5001/api/income-trn/bulk",
          jsonData,
        );

        if (res.data.inserted === 0 && res.data.skipped > 0) {
          alert(
            "Bulk Upload Failed: All records already exist (duplicate data).",
          );
        } else if (res.data.inserted > 0 && res.data.skipped > 0) {
          alert(
            `Bulk Upload Partially Completed.\n\nInserted: ${res.data.inserted}\nDuplicate Records Skipped: ${res.data.skipped}`,
          );
        } else {
          alert("Bulk Upload Successful.");
        }

        setActiveTab("records");
        await fetchIncomeRecords();
      } catch (error) {
        console.error(error);
        alert("Bulk Upload Failed");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const monthlyRecords = records.filter((item) => {
    if (!selectedMonth) return true;

    const [day, month, year] = item.incomeDate.split("-");

    return `${year}-${month}` === selectedMonth;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.amount || !formData.incomeDate) {
      alert("Please fill all required fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const duplicate = records.find((item) => {
      const existingMonth = item.incomeDate.split("-"); 
      const newMonth = formData.incomeDate.split("-"); 

      return (
        item.userId === formData.userId &&
        String(item.incomeType) === String(formData.incomeType) &&
        `${existingMonth[2]}-${existingMonth[1]}` ===
          `${newMonth[0]}-${newMonth[1]}` &&
        item.id !== editId
      );
    });

    if (duplicate) {
     alert(
       "This Income Type already exists for this user for the selected month",
     );
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, {
          IT_ID: formData.incomeType,
          Inc_Value: formData.amount,
          Inc_Date: formData.incomeDate,
          Remarks: formData.remarks,
        });

        alert("Income Updated Successfully");
      } else {
        await axios.post(API_URL, {
          UID: formData.uid,
          IT_ID: formData.incomeType,
          Inc_Value: formData.amount,
          Inc_Date: formData.incomeDate,
          Remarks: formData.remarks,
        });

        alert("Income Added Successfully");
      }

      fetchIncomeRecords();

      setFormData({
        userId: "",
        username: "",
        uid: "",
        incomeType: "",
        amount: "",
        incomeDate: "",
        remarks: "",
      });

      setShowAddModal(false);
      setEditId(null);
    } catch (error) {
      console.error(error);
      alert("Error saving income");
    }
  };

  const handleEdit = (record) => {
    setEditId(record.id);

    setFormData({
      uid: record.uid,
      userId: record.userId,
      username: record.username,
      incomeType: record.incomeType,
      amount: record.amount,
      incomeDate: reverseDate(record.incomeDate),
      remarks: record.remarks,
    });

    setShowAddModal(true);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.username.toLowerCase().includes(search.toLowerCase()) ||
      record.userId.toLowerCase().includes(search.toLowerCase()),
  );

  const incomeSummary = Object.values(
    records.reduce((acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = {
          userId: item.userId,
          username: item.username,
          totalIncome: 0,
        };
      }

      acc[item.userId].totalIncome += Number(item.amount);

      return acc;
    }, {}),
  );

  return (
    <>
      <div className="income-page">
        <div className="income-header">
          <h2>Income Transactions</h2>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "single" ? "active" : ""}
            onClick={() => setActiveTab("single")}
          >
            Single Entry
          </button>

          <button
            className={activeTab === "records" ? "active" : ""}
            onClick={() => {
              setActiveTab("records");
              setSearch(""); 
            }}
          >
            All Records
          </button>
        </div>

        {activeTab === "single" && (
          <div className="income-card">
            <div className="card-header">
              <h3>Monthly Income Records</h3>

              <div className="header-actions">
                <button
                  className="upload-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaUpload />
                  Bulk Upload
                </button>

                <button
                  className="add-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus />
                  Add Income
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="month-filter">
              <label>Select Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>USERNAME</th>
                    <th>DATE</th>
                    <th>INCOME TYPE</th>
                    <th>AMOUNT</th>
                    <th>REMARKS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {monthlyRecords.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.userId}</td>
                      <td>{item.username}</td>
                      <td>{item.incomeDate}</td>
                      <td>{item.incomeTypeName}</td>
                      <td>₹ {item.amount}</td>
                      <td>{item.remarks}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="edit-btn delete-icon-btn"
                          onClick={() => handleDelete(item.id)}
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
        )}

        {activeTab === "records" && (
          <div className="income-card">
            <div className="records-header">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search Username or UID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>USERNAME</th>
                    <th>DATE</th>
                    <th>INCOME TYPE</th>
                    <th>AMOUNT</th>
                    <th>REMARKS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.userId}</td>
                      <td>{record.username}</td>
                      <td>{record.incomeDate}</td>
                      <td>{record.incomeTypeName}</td>
                      <td>₹ {record.amount}</td>
                      <td>{record.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {showAddModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>{editId ? "Edit Income" : "Add Income"}</h3>
              <FaTimes
                onClick={() => {
                  setShowAddModal(false);
                  setEditId(null);
                  setFormData({
                    userId: "",
                    username: "",
                    incomeType: "",
                    amount: "",
                    incomeDate: "",
                    remarks: "",
                  });
                }}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>User ID :</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={(e) => {
                    handleChange(e);

                    fetchUserDetails(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Username :</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Date :</label>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  name="incomeDate"
                  value={formData.incomeDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Income Type :</label>
                <select
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                >
                  <option value="">Select Income Type</option>

                  {incomeTypes.map((type) => (
                    <option key={type.IT_ID} value={type.IT_ID}>
                      {type.Income_Type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount :</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Remarks :</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditId(null);
                  setFormData({
                    userId: "",
                    username: "",
                    incomeType: "",
                    amount: "",
                    incomeDate: "",
                    remarks: "",
                  });
                }}
              >
                Cancel
              </button>

              <button className="save-btn" onClick={handleSubmit}>
                <FaSave />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IncomeTransactions;
