import React, { useState } from "react";
import "./Sidebar.css";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdCategory,
  MdOutlineNotifications,
} from "react-icons/md";
import {
  FaUsers,
  FaUserShield,
  FaDatabase,
  FaWallet,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiReceiveMoney, GiPiggyBank } from "react-icons/gi";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function Sidebar() {
  const [showMaster, setShowMaster] = useState(false);

  const [showTransaction, setShowTransaction] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="top-navbar">
      <div className="nav-left">
        <div className="logo-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
            alt="logo"
            className="custom-logo"
          />
        </div>

        <div className="logo-text">
          <h2>ExpenseTrack</h2>
          <p>MANAGEMENT SUITE</p>
        </div>
      </div>
      <div className="nav-menu">
        <Link to="/" className="nav-link">
          <div className="nav-item">
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </div>
        </Link>
        <div className="nav-item" onClick={() => setShowMaster(!showMaster)}>
          <FaDatabase className="icon" />
          <span>Masters</span>

          {showMaster ? (
            <MdKeyboardArrowDown className="arrow" />
          ) : (
            <MdKeyboardArrowRight className="arrow" />
          )}

          {showMaster && (
            <div className="dropdown">
              <Link to="/users" className="dropdown-link">
                <div className="dropdown-item">
                  <FaUsers className="sub-icon users-icon" />
                  Users
                </div>
              </Link>

              <Link to="/roles" className="dropdown-link">
                <div className="dropdown-item">
                  <FaUserShield className="sub-icon role-icon" />
                  Roles
                </div>
              </Link>

              <div className="dropdown-item">
                <MdCategory className="sub-icon category-icon" />
                Expense Category
              </div>

              <Link to="/expense-type" className="dropdown-link">
                <div className="dropdown-item">
                  <BsCurrencyDollar className="sub-icon expense-icon" />
                  Expense Type
                </div>
              </Link>

              <div className="dropdown-item">
                <GiReceiveMoney className="sub-icon income-icon" />
                Income Type
              </div>
            </div>
          )}
        </div>
        <div
          className="nav-item"
          onClick={() => setShowTransaction(!showTransaction)}
        >
          <BiTransfer className="icon" />
          <span>Transactions</span>

          {showTransaction ? (
            <MdKeyboardArrowDown className="arrow" />
          ) : (
            <MdKeyboardArrowRight className="arrow" />
          )}

          {showTransaction && (
            <div className="dropdown">
              <div className="dropdown-item">
                <HiTrendingUp className="sub-icon income-icon" />
                Income
              </div>

              <Link to="/expense" className="dropdown-link">
                <div className="dropdown-item">
                  <HiTrendingDown className="sub-icon expense-icon" />
                  Expenses
                </div>
              </Link>

              <div className="dropdown-item">
                <GiPiggyBank className="sub-icon loan-icon" />
                Loan
              </div>
            </div>
          )}
        </div>

        <div className="nav-item">
          <HiOutlineDocumentReport className="icon" />
          <span>Reports</span>
        </div>
      </div>

      <div className="nav-right">
        <div className="notification-box">
          <MdOutlineNotifications />
        </div>

        <div
          className="profile-wrapper"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="profile-box">
            <div className="profile-avatar">S</div>

            <div className="profile-info">
              <h4>SS</h4>
              <p>Administrator</p>
            </div>

            <MdKeyboardArrowDown className="arrow" />
          </div>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-item">
                <FaUserCircle />
                My Profile
              </div>

              <div className="profile-item">
                <FaCog />
                Settings
              </div>

              <div className="profile-item logout">
                <FaSignOutAlt />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
