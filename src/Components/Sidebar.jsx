import React, { useState, useEffect, useRef } from "react";
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
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
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
  const [activeMenu, setActiveMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const menuRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setActiveMenu(null);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
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
          <p>MANAGEMENT SUITE</p>
        </div>
      </div>

      <div className="nav-menu" ref={menuRef}>
        <Link to="/" className="nav-link">
          <div className="nav-item">
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </div>
        </Link>

        <div className="nav-item" onClick={() => toggleMenu("masters")}>
          <FaDatabase className="icon" />
          <span>Masters</span>
          {activeMenu === "masters" ? (
            <MdKeyboardArrowDown className="arrow" />
          ) : (
            <MdKeyboardArrowRight className="arrow" />
          )}

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
                  <FaUserShield className="sub-icon role-icon" />
                  Roles
                </div>
              </Link>

              <Link to="/expense-category" className="dropdown-link">
                <div className="dropdown-item">
                  <MdCategory className="sub-icon category-icon" />
                  Expense Category
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
                  <GiReceiveMoney className="sub-icon income-icon" />
                  Income Type
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className="nav-item" onClick={() => toggleMenu("transactions")}>
          <BiTransfer className="icon" />
          <span>Transactions</span>
          {activeMenu === "transactions" ? (
            <MdKeyboardArrowDown className="arrow" />
          ) : (
            <MdKeyboardArrowRight className="arrow" />
          )}

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
          ref={profileRef}
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
                <FaUserCircle /> My Profile
              </div>
              <div className="profile-item">
                <FaCog /> Settings
              </div>
              <div className="profile-item logout">
                <FaSignOutAlt /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
