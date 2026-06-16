import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Topbar.css";

import { MdDashboard, MdKeyboardArrowDown, MdCategory } from "react-icons/md";

import {
  FaUsers,
  FaUserShield,
  FaDatabase,
  FaUserCircle,
  FaSignOutAlt,
  FaHandHoldingUsd
} from "react-icons/fa";

import { BiTransfer } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiReceiveMoney, GiPiggyBank } from "react-icons/gi";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiOutlineDocumentReport,
} from "react-icons/hi";

function Topbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const username = localStorage.getItem("username") || "User";

  const menuRef = useRef();
  const profileRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Initials
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // 🔹 Click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
  

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  const isActive = (path) => location.pathname === path;

  const isDashboardActive = isActive("/dashboard");

  const isMastersActive = [
    "/users",
    "/roles",
    "/expense-category",
    "/expense-type",
    "/income-type",
  ].includes(location.pathname);

  const isTransactionsActive = [
    "/income-transactions",
    "/expense",
    "/loan-transaction",
  ].includes(location.pathname);

  const isReportsActive = isActive("/reports");

  const openProfile = () => {
    setShowProfile((v) => !v);
  };

  return (
    <div className="top-navbar">
      {/* LEFT */}
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
        </div>
      </div>

      <div className="nav-divider" />

      {/* MENU */}
      <div className="nav-menu" ref={menuRef}>
        <Link
          to="/dashboard"
          className="nav-link"
          onClick={() => setActiveMenu(null)}
        >
          <div
            className={`nav-item ${
              isDashboardActive ? "nav-item--active" : ""
            }`}
          >
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </div>
        </Link>

        {/* Masters */}
        <div
          className={`nav-item ${
            isMastersActive || activeMenu === "masters"
              ? "nav-item--active"
              : ""
          }`}
          onClick={() => toggleMenu("masters")}
        >
          <FaDatabase className="icon" />
          <span>Masters</span>
          <MdKeyboardArrowDown />

          {activeMenu === "masters" && (
            <div className="dropdown">
              <Link to="/users" className="dropdown-link">
                <div className="dropdown-item">
                  <FaUsers className="sub-icon users-icon" />
                  Users
                </div>
              </Link>
              <Link to="/roles" className="dropdown-link">
                <div className="dropdown-item">
                  <FaUserShield className="sub-icon role-icon" /> Roles
                </div>
              </Link>
              <Link to="/expense-category" className="dropdown-link">
                <div className="dropdown-item">
                  <MdCategory className="sub-icon category-icon" /> Expense
                  Category
                </div>
              </Link>
              <Link to="/expense-type" className="dropdown-link">
                <div className="dropdown-item">
                  <BsCurrencyDollar className="sub-icon expense-icon" />
                  Expense Type
                </div>
              </Link>
              <Link to="/income-type" className="dropdown-link">
                <div className="dropdown-item">
                  <GiReceiveMoney className="sub-icon income-icon" /> Income
                  Type
                </div>
              </Link>
            </div>
          )}
        </div>

        <div
          className={`nav-item ${
            isTransactionsActive || activeMenu === "transactions"
              ? "nav-item--active"
              : ""
          }`}
          onClick={() => toggleMenu("transactions")}
        >
          <BiTransfer className="icon" />
          <span>Transactions</span>
          <MdKeyboardArrowDown />

          {activeMenu === "transactions" && (
            <div className="dropdown">
              <Link to="/income-transactions" className="dropdown-link">
                <div className="dropdown-item">
                  <HiTrendingUp className="sub-icon income-icon" />
                  Income
                </div>
              </Link>
              <Link to="/expense" className="dropdown-link">
                <div className="dropdown-item">
                  <HiTrendingDown className="sub-icon expense-icon" />
                  Expenses
                </div>
              </Link>
              <Link to="/loan-transaction" className="dropdown-link">
                <div className="dropdown-item">
                  <FaHandHoldingUsd className="sub-icon loan-icon" /> Loan
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/reports"
          className="nav-link"
          onClick={() => setActiveMenu(null)}
        >
          <div
            className={`nav-item ${isReportsActive ? "nav-item--active" : ""}`}
          >
            <HiOutlineDocumentReport className="icon" />
            <span>Reports</span>
          </div>
        </Link>
      </div>

      {/* RIGHT (ONLY PROFILE) */}
      <div className="nav-right">
        <div className="profile-wrapper" ref={profileRef}>
          <div className="profile-box" onClick={openProfile}>
            <div className="profile-avatar">{getInitials(username)}</div>
            <MdKeyboardArrowDown />
          </div>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-item">
                <FaUserCircle /> {username}
              </div>
              <div className="profile-divider" />
              <div
                className="profile-item logout"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <FaSignOutAlt /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
