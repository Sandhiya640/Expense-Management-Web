import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoanTransaction.css";
import { FaSave, FaEdit, FaSearch } from "react-icons/fa";

function LoanTransaction() {
  const [activeTab, setActiveTab] = useState("single");
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/loans");

      const formattedData = response.data.map((item) => ({
        loanId: item.LO_ID,
        uid: item.UID,
        userId: item.Emp_Code,
        userName: item.Emp_Name,
        loanCategory: item.Loan_Type,
        bankName: item.Bank_Name,
        loanAmount: item.Loan_Amount,
        interestRate: item.Interest_Rate,
        EMIstartDate: item.EMI_Start_Date,
        tenureMonths: item.Tenure,
        dueDate: item.Due_Date,
        monthlyEMI: item.Monthly_EMI,
        status: item.Status,
      }));

      setRecords(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLoans();
  }, []);

  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    loanCategory: "",
    bankName: "",
    loanAmount: "",
    interestRate: "",
    EMIstartDate: "",
    tenureMonths: "",
    dueDate: "",
    monthlyEMI: "",
    status: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  };
  const calculateMonthlyEMI = (amount, rate, months) => {
    const P = Number(amount);

    const R = Number(rate) / (12 * 100);

    const N = Number(months);

    if (!P || !R || !N) return "";

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    return emi.toFixed(2);
  };
  const calculateDueDate = (EMIstartDate, months) => {
    if (!EMIstartDate || !months) return "";
    const d = new Date(EMIstartDate);
    d.setMonth(d.getMonth() + Number(months));
    return d.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = {
      ...formData,
      [name]: value,
    };

    if (
      name === "loanAmount" ||
      name === "interestRate" ||
      name === "tenureMonths"
    ) {
      updated.monthlyEMI = calculateMonthlyEMI(
        name === "loanAmount" ? value : updated.loanAmount,
        name === "interestRate" ? value : updated.interestRate,
        name === "tenureMonths" ? value : updated.tenureMonths,
      );
    }
    if (name === "EMIstartDate" || name === "tenureMonths") {
      updated.dueDate = calculateDueDate(
        name === "EMIstartDate" ? value : updated.EMIstartDate,
        name === "tenureMonths" ? value : updated.tenureMonths,
      );
    }

    setFormData(updated);
  };
  const resetForm = () => {
    setEditId(null);

    setFormData({
      userId: "",
      userName: "",
      loanCategory: "",
      bankName: "",
      loanAmount: "",
      interestRate: "",
      EMIstartDate: "",
      tenureMonths: "",
      dueDate: "",
      monthlyEMI: "",
      status: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) return alert("Please select a User");

    if (!formData.loanCategory) return alert("Please select a Loan Category");

    if (!formData.bankName) return alert("Please select a Bank Name");

    if (!formData.loanAmount) return alert("Please enter Loan Amount");

    if (!formData.interestRate) return alert("Please enter Interest Rate");

    if (!formData.EMIstartDate) return alert("Please select EMI Start Date");

    if (!formData.tenureMonths) return alert("Please enter Tenure Months");

    if (!formData.status) return alert("Please select Status");

    try {
      const payload = {
        UID: formData.userId,
        Loan_Type: formData.loanCategory,
        Bank_Name: formData.bankName,
        Loan_Amount: formData.loanAmount,
        Interest_Rate: formData.interestRate,
        EMI_Start_Date: formData.EMIstartDate,
        Tenure: formData.tenureMonths,
        Due_Date: formData.dueDate,
        Monthly_EMI: formData.monthlyEMI,
        Status: formData.status,
      };

      if (editId) {
        await axios.put(`http://localhost:5001/api/loans/${editId}`, payload);

        alert("Loan Updated Successfully");
      } else {
        await axios.post("http://localhost:5001/api/loans", payload);

        alert("Loan Saved Successfully");
      }

      fetchLoans();
      resetForm();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.error || "Failed to save loan");
    }
  };

  const handleEdit = (item) => {
    setActiveTab("single");

    setEditId(item.loanId);

    setFormData({
      userId: item.uid,
      userName: item.userName,
      loanCategory: item.loanCategory,
      bankName: item.bankName,
      loanAmount: item.loanAmount,
      interestRate: item.interestRate,
      EMIstartDate: item.EMIstartDate ? item.EMIstartDate.split("T")[0] : "",
      tenureMonths: item.tenureMonths,
      dueDate: item.dueDate,
      monthlyEMI: item.monthlyEMI,
      status: item.status,
    });
  };

  const filteredRecords = records.filter(
    (r) =>
      r.userId?.toString().toLowerCase().includes(search.toLowerCase()) ||
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.loanCategory?.toLowerCase().includes(search.toLowerCase()) ||
      r.bankName?.toLowerCase().includes(search.toLowerCase()) ||
      r.status?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="expense-page">
      <div className="expense-header">
        <h2>Loan Transactions</h2>
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
          onClick={() => setActiveTab("records")}
        >
          All Records
        </button>
      </div>

      {activeTab === "single" && (
        <div className="expense-card">
          <form onSubmit={handleSubmit}>
            <div className="loan-form">
              <div className="form-row">
                <label>USER ID :</label>

                <select
                  name="userId"
                  value={formData.userId}
                  disabled={editId}
                  onChange={(e) => {
                    const selectedUser = users.find(
                      (u) => u.UID === Number(e.target.value),
                    );

                    setFormData({
                      ...formData,
                      userId: selectedUser?.UID || "",
                      userName: selectedUser?.Emp_Name || "",
                    });
                  }}
                >
                  <option value="">Select User ID</option>

                  {users.map((user) => (
                    <option key={user.UID} value={user.UID}>
                      {user.Emp_Code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label>USER NAME :</label>

                <input type="text" value={formData.userName} readOnly />
              </div>
              <div className="form-row">
                <label>LOAN CATEGORY :</label>

                <select
                  name="loanCategory"
                  value={formData.loanCategory}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Education">Education</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Home">Home</option>
                  <option value="Business">Business</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div className="form-row">
                <label>BANK NAME :</label>

                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                >
                  <option value="">Select Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="ICICI">ICICI</option>
                  <option value="Axis">Axis</option>
                  <option value="Canara">Canara</option>
                  <option value="Indian Bank">Indian Bank</option>
                  <option value="Kvb">Kvb</option>
              
                </select>
              </div>

              <div className="form-row">
                <label>LOAN AMOUNT :</label>

                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>INTEREST RATE :</label>

                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>EMI START DATE :</label>

                <input
                  type="date"
                  name="EMIstartDate"
                  value={formData.EMIstartDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>TENURE MONTHS :</label>

                <input
                  type="number"
                  name="tenureMonths"
                  value={formData.tenureMonths}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>DUE DATE :</label>

                <input
                  type="text"
                  value={formatDate(formData.dueDate)}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label>MONTHLY EMI :</label>

                <input type="number" value={formData.monthlyEMI} readOnly />
              </div>
              <div className="form-row">
                <label>STATUS :</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="action-buttons">
              <button type="button" className="reset-btn" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="save-btn">
                <FaSave /> {editId ? "Update" : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "records" && (
        <div className="expense-card">
          <div className="search-box">
            <FaSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Loan Category..."
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>LOAN ID</th>
                <th>USER ID</th>
                <th>USER NAME</th>
                <th>LOAN TYPE</th>
                <th>BANK NAME</th>
                <th>EMI START DATE</th>
                <th>TENURE</th>
                <th>DUE DATE</th>
                <th>MONTHLY EMI</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.loanId}>
                  <td>{item.loanId}</td>

                  <td>{item.userId}</td>

                  <td>{item.userName}</td>

                  <td>{item.loanCategory}</td>

                  <td>{item.bankName}</td>

                  <td>{formatDate(item.EMIstartDate)}</td>

                  <td>{item.tenureMonths}</td>

                  <td>{formatDate(item.dueDate)}</td>

                  <td>₹ {item.monthlyEMI}</td>

                  <td>{item.status}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LoanTransaction;
