import React, { useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaUniversity,
  FaDownload,
  FaFileExcel,
} from "react-icons/fa";

import "./Reports.css";

function Reports() {
  const [recentDownloads, setRecentDownloads] = useState([]);

  const downloadReport = async (type, title) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/reports/${type}`,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.download = `${type}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      const newDownload = {
        name: `${title} Report`,
        date: new Date().toLocaleString(),
        status: "Downloaded",
      };

      setRecentDownloads((prev) => [newDownload, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Download Failed");
    }
  };

  const reports = [
    {
      title: "User Master",
      type: "users",
      icon: <FaUsers />,
      description: "Download all user details",
    },

    {
      title: "Income Transaction",
      type: "income",
      icon: <FaMoneyBillWave />,
      description: "Download income records",
    },

    {
      title: "Expense Transaction",
      type: "expense",
      icon: <FaWallet />,
      description: "Download expense records",
    },

    {
      title: "Loan Transaction",
      type: "loan",
      icon: <FaUniversity />,
      description: "Download loan records",
    },
  ];

  return (
    <div className="report-page">
      
      <div className="summary-grid">
        <div className="summary-card income">
          <h4>Total Income</h4>
          <h2>₹5,20,000</h2>
        </div>

        <div className="summary-card expense">
          <h4>Total Expense</h4>
          <h2>₹2,10,000</h2>
        </div>

        <div className="summary-card saving">
          <h4>Net Savings</h4>
          <h2>₹3,10,000</h2>
        </div>

        <div className="summary-card loan">
          <h4>Total Loans</h4>
          <h2>₹8,50,000</h2>
        </div>
      </div>

      <div className="report-grid">
        {reports.map((report) => (
          <div className="report-card" key={report.type}>
            <div className="report-icon">{report.icon}</div>

            <h3>{report.title}</h3>

            <p>{report.description}</p>

            <button onClick={() => downloadReport(report.type, report.title)}>
              <FaDownload />
              Download Excel
            </button>
          </div>
        ))}
      </div>

      <div className="recent-download">
        <h3>
          <FaFileExcel className="excel-icon"/>
          Recent Downloads
        </h3>

        <table>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentDownloads.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty">
                  No reports downloaded yet
                </td>
              </tr>
            ) : (
              recentDownloads.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>

                  <td>{item.date}</td>

                  <td>
                    <span className="status">{item.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
