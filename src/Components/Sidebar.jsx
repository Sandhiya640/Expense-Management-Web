import React, { useState } from "react";
import "./Sidebar.css";

import {
  MdDashboard,MdKeyboardArrowDown,MdKeyboardArrowRight,MdCategory,MdOutlineSavings,} from "react-icons/md";
import {
HiTrendingUp,HiTrendingDown} from "react-icons/hi";
import {
  FaUsers,FaUserShield,FaDatabase,FaWallet,} from "react-icons/fa";

import {BiTransfer} from "react-icons/bi";

import {
  BsCashStack,BsCurrencyDollar,} from "react-icons/bs";

import {GiReceiveMoney} from "react-icons/gi";

import {HiOutlineDocumentReport} from "react-icons/hi";

function Sidebar() {

  const [showMaster, setShowMaster] =useState(true);
  const [showTransaction, setShowTransaction] =useState(false);

  return (

    <div className="sidebar">

      <div className="logo-section">
       
        <div className="logo-box">
          <FaWallet className="logo-icon" />
        </div>

        <div>
          <h2>ExpenseTrack</h2>
          <p>Expense Management</p>
        </div>

      </div>

      <div className="menu-item active">

        <div className="menu-left">
          <MdDashboard className="icon" />
          <span>Dashboard</span>
        </div>

      </div>

      <div
        className="menu-item"
        onClick={() =>
          setShowMaster(!showMaster)
        }
      >

        <div className="menu-left">
          <FaDatabase className="icon" />
          <span>Masters</span>
        </div>

        {showMaster ? (
          <MdKeyboardArrowDown className="arrow" />
        ) : (
          <MdKeyboardArrowRight className="arrow" />
        )}

      </div>

      {showMaster && (

        <div className="submenu">

          <div className="submenu-item">
            <FaUsers className="sub-icon users-icon" />
            <span>Users</span>
          </div>

          <div className="submenu-item">
            <FaUserShield className="sub-icon role-icon" />
            <span>Roles</span>
          </div>

          <div className="submenu-item">
            <MdCategory className="sub-icon category-icon" />
            <span>Expense Category</span>
          </div>

          <div className="submenu-item">
            <BsCurrencyDollar className="sub-icon expense-icon" />
            <span>Expense Type</span>
          </div>

          <div className="submenu-item">
            <GiReceiveMoney className="sub-icon income-icon" />
            <span>Income Type</span>
          </div>

        </div>

      )}
      <div
        className="menu-item"
        onClick={() =>
          setShowTransaction(!showTransaction)
        }
      >

        <div className="menu-left">
          <BiTransfer className="icon" />
          <span>Transactions</span>
        </div>

        {showTransaction ? (
          <MdKeyboardArrowDown className="arrow" />
        ) : (
          <MdKeyboardArrowRight className="arrow" />
        )}

      </div>

      {showTransaction && (

        <div className="submenu">

          <div className="submenu-item">
           <HiTrendingUp className="sub-icon income-icon" />
            <span>Income</span>
          </div>

          <div className="submenu-item">
            <HiTrendingDown className="sub-icon expense-icon" />
            <span>Expenses</span>
          </div>

          <div className="submenu-item">
            <MdOutlineSavings className="sub-icon loan-icon" />
            <span>Loans</span>
          </div>

        </div>

      )}
      <div className="menu-item">

        <div className="menu-left">
          <HiOutlineDocumentReport className="icon" />
          <span>Reports</span>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;