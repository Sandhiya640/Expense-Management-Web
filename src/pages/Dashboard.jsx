import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaWallet, FaChartLine, FaUniversity } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedYear, setSelectedYear] = useState("2026");

 const [dashboardData, setDashboardData] = useState({
   income: 0,
   expense: 0,
   savings: 0,
   loan: 0,
 });
const [incomeData, setIncomeData] = useState([]);
const [expenseData, setExpenseData] = useState([]);
const [comparisonData, setComparisonData] = useState([]);

const COLORS = [
  "#ec4899",
  "#16a34a",
  "#9333ea", 
];
  const donutColors = [
    "#16a34a", 
    "#ef4444", 
    "#ec4899", 
    "#9333ea",
  ];
const summaryData = [
  {
    name: "Savings",
    value: dashboardData.savings || 0,
  },
  {
    name: "Income",
    value: dashboardData.income || 0,
  },
  {
    name: "Loan",
    value: dashboardData.loan || 0,
  },
];

  const donutData = [
    {
      name: "Income",
      value: dashboardData.income || 0,
    },
    {
      name: "Expense",
      value: dashboardData.expense || 0,
    },
    {
      name: "Savings",
      value: dashboardData.savings || 0,
    },
    {
      name: "Loan",
      value: dashboardData.loan || 0,
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/all"
      );

      console.log("Users:", res.data);

      setUsers(res.data);
      setSelectedUser("ALL");
    } catch (err) {
      console.log("Users API Error:", err);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchDashboard();
    }
  }, [selectedUser, selectedYear]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/dashboard?uid=${selectedUser}&year=${selectedYear}`
      );

      console.log("Dashboard:", res.data);

      setDashboardData({
        income: res.data.income || 0,
        expense: res.data.expense || 0,
        savings: res.data.savings || 0,
        loan: res.data.loan || 0,
      });

      if (res.data.incomeData) {
        setIncomeData(res.data.incomeData);
      }

      if (res.data.expenseData) {
        setExpenseData(res.data.expenseData);
      }

      if (res.data.comparisonData) {
        setComparisonData(res.data.comparisonData);
      }
    } catch (err) {
      console.log("Dashboard API Error:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>

        <div className="filters">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="ALL">All Users</option>

            {users.map((user) => (
              <option key={user.UID} value={user.UID}>
                {user.Emp_Code} - {user.Emp_Name}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      {/* LEVEL 1 */}
      <div className="level1">
        <div className="kpi-cards">
          <div className="kpi-card savings">
            <div className="card-content">
              <div>
                <p>Net Savings</p>
                <h2>₹{Number(dashboardData.savings || 0).toLocaleString()}</h2>
              </div>

              <div className="card-icon savings-icon">
                <FaWallet />
              </div>
            </div>
          </div>

          <div className="kpi-card investment">
            <div className="card-content">
              <div>
                <p>Total Income</p>

                <h2>₹{Number(dashboardData.income || 0).toLocaleString()}</h2>
              </div>

              <div className="card-icon investment-icon">
                <FaChartLine />
              </div>
            </div>
          </div>

          <div className="kpi-card loan">
            <div className="card-content">
              <div>
                <p>Outstanding Loan</p>
                <h2>₹{Number(dashboardData.loan || 0).toLocaleString()}</h2>
              </div>

              <div className="card-icon loan-icon">
                <FaUniversity />
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card pie-card">
          <h3>Financial Distribution (%)</h3>

          <div className="pie-layout">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie
                  data={summaryData}
                  dataKey="value"
                  outerRadius={60}
                  label={false}
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString()}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pie-legend">
              <div>
                <span className="dot pink"></span>
                Savings
              </div>

              <div>
                <span className="dot green"></span>
                Income
              </div>

              <div>
                <span className="dot purple"></span>
                Loans
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 2 */}

      <div className="level2">
        <div className="chart-card">
          <h3>Monthly Income Trend(₹)</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`]} />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Expense Trend (₹)</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`]} />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LEVEL 3 */}

      <div className="level3">
        <div className="chart-card">
          <h3>Income vs Expense Trend</h3>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`]} />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#16a34a"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card donut-card">
          <h3>Income Distribution (%)</h3>

          <div className="donut-layout">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  label={false}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={index} fill={donutColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString()}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-legend">
              <div>
                <span className="dot green"></span>
                Income
              </div>

              <div>
                <span className="dot red"></span>
                Expense
              </div>

              <div>
                <span className="dot pink"></span>
                Savings
              </div>

              <div>
                <span className="dot purple"></span>
                Loan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
