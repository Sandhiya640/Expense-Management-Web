import React, { useState, useEffect, useRef } from "react";
import "./Topbar.css";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdCategory,
  MdOutlineNotifications,
  MdSearch,
  MdSettings,
  MdClose,
  MdCheckCircle,
  MdPayment,
  MdWarning,
} from "react-icons/md";
import {
  FaUsers,
  FaUserShield,
  FaDatabase,
  FaUserCircle,
  FaSignOutAlt,
  FaWifi,
  FaShieldAlt,
} from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiReceiveMoney, GiPiggyBank } from "react-icons/gi";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const NOTIFICATIONS = [
  {
    id: 1,
    icon: <MdPayment />,
    iconClass: "notif-icon notif-icon--blue",
    title: "New expense submitted",
    desc: "Priya Sharma added ₹4,200 travel expense",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: <MdCheckCircle />,
    iconClass: "notif-icon notif-icon--green",
    title: "Report generated",
    desc: "Monthly expense report is ready to download",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 3,
    icon: <MdWarning />,
    iconClass: "notif-icon notif-icon--amber",
    title: "Budget limit warning",
    desc: "Marketing category reached 85% of budget",
    time: "3 hr ago",
    unread: true,
  },
  {
    id: 4,
    icon: <FaUserShield />,
    iconClass: "notif-icon notif-icon--purple",
    title: "New user added",
    desc: "Rahul Verma was added as a User",
    time: "Yesterday",
    unread: false,
  },
];

const SETTINGS_SECTIONS = [
  {
    label: "Account",
    items: [
      { icon: <FaUserCircle />, text: "Profile Settings" },
      { icon: <FaShieldAlt />, text: "Security & Password" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: <FaWifi />, text: "Notifications" },
      { icon: <MdSettings />, text: "Preferences" },
    ],
  },
];

function Topbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const menuRef = useRef();
  const profileRef = useRef();
  const notifRef = useRef();
  const settingsRef = useRef();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismissNotif = (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const isActive = (path) => location.pathname === path;
  const isDashboardActive = isActive("/");
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

  const openNotif = () => {
    setShowNotif((v) => !v);
    setShowProfile(false);
    setShowSettings(false);
  };
  const openSettings = () => {
    setShowSettings((v) => !v);
    setShowProfile(false);
    setShowNotif(false);
  };
  const openProfile = () => {
    setShowProfile((v) => !v);
    setShowNotif(false);
    setShowSettings(false);
  };

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
        </div>
      </div>

      <div className="nav-divider" />

      <div className="nav-menu" ref={menuRef}>
        <Link to="/" className="nav-link">
          <div
            className={`nav-item ${isDashboardActive ? "nav-item--active" : ""}`}
          >
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </div>
        </Link>

        <div
          className={`nav-item ${isMastersActive || activeMenu === "masters" ? "nav-item--active" : ""}`}
          onClick={() => toggleMenu("masters")}
        >
          <FaDatabase className="icon" />
          <span>Masters</span>
          <MdKeyboardArrowDown
            className={`arrow arrow--rotate ${activeMenu === "masters" ? "arrow--open" : ""}`}
          />
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

        <div
          className={`nav-item ${isTransactionsActive || activeMenu === "transactions" ? "nav-item--active" : ""}`}
          onClick={() => toggleMenu("transactions")}
        >
          <BiTransfer className="icon" />
          <span>Transactions</span>
          <MdKeyboardArrowDown
            className={`arrow arrow--rotate ${activeMenu === "transactions" ? "arrow--open" : ""}`}
          />
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
                  <GiPiggyBank className="sub-icon loan-icon" />
                  Loan
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link to="/reports" className="nav-link">
          <div
            className={`nav-item ${isReportsActive ? "nav-item--active" : ""}`}
          >
            <HiOutlineDocumentReport className="icon" />
            <span>Reports</span>
          </div>
        </Link>
      </div>

      <div className="nav-right">
        <div
          className={`search-bar ${searchFocused ? "search-bar--focused" : ""}`}
        >
          <MdSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              <MdClose />
            </button>
          )}
          <kbd className="search-kbd">⌘K</kbd>
        </div>

        <div className="icon-btn" ref={notifRef} onClick={openNotif}>
          <MdOutlineNotifications />
          {unreadCount > 0 && (
            <span className="notif-badge">{unreadCount}</span>
          )}

          {showNotif && (
            <div
              className="panel notif-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="panel-header">
                <span className="panel-title">Notifications</span>
                {unreadCount > 0 && (
                  <button className="panel-action" onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 && (
                  <p className="panel-empty">You're all caught up!</p>
                )}
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`notif-item ${n.unread ? "notif-item--unread" : ""}`}
                  >
                    <div className={n.iconClass}>{n.icon}</div>
                    <div className="notif-body">
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-desc">{n.desc}</p>
                      <p className="notif-time">{n.time}</p>
                    </div>
                    <button
                      className="notif-dismiss"
                      onClick={(e) => dismissNotif(e, n.id)}
                    >
                      <MdClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="icon-btn" ref={settingsRef} onClick={openSettings}>
          <MdSettings />
          {showSettings && (
            <div
              className="panel settings-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="panel-header">
                <span className="panel-title">Settings</span>
              </div>
              {SETTINGS_SECTIONS.map((sec) => (
                <div key={sec.label}>
                  <p className="settings-section-label">{sec.label}</p>
                  {sec.items.map((item) => (
                    <div key={item.text} className="settings-item">
                      <span className="settings-item-icon">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-divider" />

        <div className="profile-wrapper" ref={profileRef} onClick={openProfile}>
          <div className="profile-box">
            <div className="profile-avatar">SS</div>
            <MdKeyboardArrowDown
              className={`arrow arrow--rotate ${showProfile ? "arrow--open" : ""}`}
            />
          </div>

          {showProfile && (
            <div
              className="profile-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-item">
                <FaUserCircle /> My Profile
              </div>
              <div className="profile-divider" />
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

export default Topbar;
